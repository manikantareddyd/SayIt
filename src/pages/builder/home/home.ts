import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { EditorHomePage } from '../editor/home/home';

@Component({
  selector: 'page-builder-home',
  templateUrl: 'home.html'
})
export class BuilderHomePage {

  constructor(public navCtrl: NavController) {
    
  }

  goToEditorHome(){
    this.navCtrl.push(EditorHomePage);
  }

}
