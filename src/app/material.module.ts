import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
    imports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatToolbarModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ]
})

export class MaterialModule{

}

