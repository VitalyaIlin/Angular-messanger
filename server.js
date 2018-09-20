const app = require('express')(),
        http = require('http').Server(app),
        io = require('socket.io')(http),
        bodyParser = require('body-parser'),
        MongoClient = require('mongodb').MongoClient,
        ObjectId = require('mongodb').ObjectID,
        config = require('./backend/config'),
        api = require('./backend/api');


    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: true }));

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.get('/', (req, res) => {
	res.send(200);
});

app.post('/', api.singup);

app.post('/auth', api.validatePayLoad, api.singin);

app.get('/cabinet', api.verifiToken, api.cabinet);

app.get('/users', api.allUsers);

io.on('connection', (socket) => {

	console.log("user connected");

	socket.on('disconnect', () => {
		console.log("user disconnected");
	});

	socket.on('online', (data) => {

	});

	socket.on('addFriend', (data) => {
		let usersData = JSON.parse(data);
		MongoClient.connect(config.dbUrl, (err, client) => {
			let db = client.db('angular-cabinet');
			let collection = db.collection('users');
	
			if(err){
				console.log(err);
				return;
			}
	
			collection.update(
				{"_id": ObjectId(usersData.userId)},
				{$push: {friends: usersData.friendId}}
			);
	
			collection.update(
				{"_id": ObjectId(usersData.friendId)},
				{$push: {friends: usersData.userId}}
			);

			let notification = `${usersData.firstname} ${usersData.secondname} wants to be your friend. Do you agree to accept his request?`;

			db.collection('notifications').insertOne({userId: usersData.friendId, text: notification}, (err, result) => {
				if(err){
					console.log(err);
					return;
				}

				io.emit('notifications', {userId: usersData.friendId, text: notification});
			});
			
		});
	});

	socket.on('chatting', (data) => {
        let user = JSON.parse(data);

		MongoClient.connect(config.dbUrl, (err, client) => {
			let db = client.db('angular-cabinet');
			let collection = db.collection('messages');
            /*let userCollection = db.collection('users');

            userCollection.findOne({"_id": ObjectId(user.recipientId)})
                .then((data) => {
                    console.log(data.photoName);
                });

            userCollection.findOne({"_id": ObjectId(user.senderId)}, {photoName: 1}).
                then((data) => {
                    console.log(data.photoName);
                });*/
			
			collection.find({$or: 
				[ 	{$or: [{recipientId: user.recipientId, senderId: user.senderId}]},
					{$or: [{recipientId: user.senderId, senderId: user.recipientId}]}
				]}, {text: 1})
				.toArray((err, result) => {
	
					if(err){
						console.log(err);
						return;
					}
                    io.emit('chatting', {res: result});
            });
		});
	});

	socket.on('message', (msg) => {
		let message = JSON.parse(msg);
		
		MongoClient.connect(config.dbUrl, (err, client) => {
			let db = client.db('angular-cabinet');
			let collection = db.collection('messages');

			collection.insertOne({recipientId: message.recipient, senderId: message.sender, text: message.text}, (err, res) => {
				if(err){
					console.log(err);
					return;
				}

				io.emit('message', {type: 'new-message', text: msg});
            })          
		});
	});
});

app.post('/upload', api.fileUpload);

http.listen(3000, () => {
	console.log('Server working...');
})