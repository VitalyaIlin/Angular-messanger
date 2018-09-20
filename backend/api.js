const app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectID;
	jwt  = require('jsonwebtoken'),
	dir = './src/assets/uploads',
	multer = require('multer'),
	crypto = require('crypto'),
	path = require('path'),
	config = require('./config');

	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
		  cb(null, dir)
		},
		filename: function (req, file, cb) {
			crypto.pseudoRandomBytes(16, function (err, raw) {
			  if (err) return cb(err)
		
			  cb(null, raw.toString('hex') + path.extname(file.originalname))
			})
		  }
	  });
	
	var upload = multer({ storage: storage }).single('photo');



module.exports.validatePayLoad = (req, res, next) => {
	if(req.body){
		next();
	}else{
		res.status(403).json({ errorMessage: 'You need a payload'});
	}
}

module.exports.singup = (req, res) => {

	console.log(req.body.profilePhoto);

	var user ={
		firstname: req.body.firstname,
		secondname: req.body.secondname,
		email: req.body.useremail,
		password: req.body.password,
	}

	MongoClient.connect(config.dbUrl, (err, client) => {

		let db = client.db('angular-cabinet');
		let collection = db.collection('users');

		collection.findOne({ email: user.email  }, function(err, result){
			if(err){
				console.log(err);
				res.sendStatus(500);
				return;
			}else if(result == null){
				collection.insertOne(user, (err, result) => {
					if(err){
						console.log(err);
						res.sendStatus(500);
						return;
					}

					console.log('User added to DB');
					res.json(200);
				});
			}else{
				res.json(result);
			}

			client.close();
		});


	});

};


module.exports.singin = (req, res) => {

	MongoClient.connect(config.dbUrl, (err, client) => {
		let db = client.db('angular-cabinet');
		let collection = db.collection('users');

		collection.findOne({email: req.body.email, password: req.body.password}, (err, result) => {
			if(err){
				console.log(err);
				res.sendStatus(500);
				return;
			}

			if(result == null){
				res.json({result});
			}else{
				jwt.sign({result}, 'secretkey', (err, token) => {
					res.status(200).json({
						result,
						token
					});
				});
			}

			
		});

		client.close();
	});

};

module.exports.cabinet = (req, res) => {

	let friends = [];

	MongoClient.connect(config.dbUrl, (err, client) => {
		let db = client.db('angular-cabinet');
		let collection = db.collection('users');

		collection.findOne({"_id": ObjectId(req.query.userId)}, (err, result) => {
			if(err){
				console.log(err);
				return;
			}

			if(result.friends){
				friends = result.friends.map((friend) => {
					return ObjectId(friend);
				});

				collection.find({"_id": {$in: friends}}).toArray((err, result) => {
					if(err){
						console.log(err);
						return;
					}
	
					res.json({status: 200, users: result});
				});
			}else{
				console.log("For start messaging add friends");
				res.json({text: "For start messaging add friends"});
			}


		});



		//client.close();
	})
	
};

module.exports.allUsers = (req, res) => {

	MongoClient.connect(config.dbUrl, (err, client) => {
		let db = client.db('angular-cabinet');
		let collection = db.collection('users');

		collection.find().toArray(function(err, result){
			if(err){
				console.log(err);
				return;
			}

			res.json({result});

		});

		client.close();
	})
	
};

module.exports.verifiToken = (req, res, next) => {

	const token = req.headers['authorization'];

	if(!token){
		res.json({status: 403});
	}else{

		jwt.verify(token, 'secretkey', (err, decoded) => {
			if(err){
				res.json({message: 'token not verified', status: 403});
			}else{
				next();
			}
		});

	}
}

module.exports.fileUpload = (req, res) => {

    upload(req, res, (err) => {
        if(err){
            console.log(err);
            res.send({"status": 422, "text": "Image didn't upload"});
		}
		
		MongoClient.connect(config.dbUrl, (err, client) => {
			let db = client.db('angular-cabinet');
			let collection = db.collection('users');

			if(err){
				console.log(err);
				return;
			}

			collection.update(
				{"_id": ObjectId(req.body.userId)}, 
				{$set: {"photoName": req.file.filename}}
			);
		});

        res.send({"status": 200, "text": "Image uploaded"});
	});
	
};


