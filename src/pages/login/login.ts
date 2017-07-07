import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

 //import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs/tabs';
import { AccountPage } from '../account/account';
//import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
import {  AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
 
@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  //login: UserOptions = { username: '', password: '' };
  submitted = false;
  constructor(
    public navCtrl: NavController, public userData: UserData,
  //private fb: Facebook,
  private afAuth: AngularFireAuth) { }

  signInWithFacebook() {
    
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.userData.setUserData(res.additionalUserInfo.profile);
        this.navCtrl.push(AccountPage);
      });
  }
  /*
  loginWithFB(){
      this.fb.login(['email','public_profile']).then((response: FacebookLoginResponse) => {
        console.log(response);
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
            this.userData.setUserData({email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']});
        });
      });
  } */
  onLogin(form: NgForm) { //not used
    this.submitted = true;

    if (form.valid) {
      //this.userData.login(this.user.);
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() { //not used
    this.navCtrl.push(AccountPage);
  }
}
