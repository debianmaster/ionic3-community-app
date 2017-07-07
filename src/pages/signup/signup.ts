import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

//import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  
  submitted = false;
  user: any;

  constructor(public navCtrl: NavController, public userData: UserData) {
    this.user = firebase.auth().currentUser;
  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      
      this.navCtrl.push(TabsPage);
    }
  }
}
