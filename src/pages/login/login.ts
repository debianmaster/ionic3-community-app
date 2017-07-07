import { Component } from '@angular/core';
import { NavController,ToastController,Events } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { AccountPage } from '../account/account';
import {  AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
 
@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  submitted = false;
  constructor(
    public navCtrl: NavController, public userData: UserData,
    public toastCtrl: ToastController,
    public events: Events,
    private afAuth: AngularFireAuth) { }
  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.events.publish('user:loggedin');
        this.userData.setUserData(res.additionalUserInfo.profile);
        this.navCtrl.push(AccountPage);
      });
  }
}
