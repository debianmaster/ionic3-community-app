import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
 
@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  constructor(public navCtrl: NavController, public userData: UserData,private fb: Facebook) { }

  loginWithFB(){
      this.fb.login(['email','public_profile']).then((response: FacebookLoginResponse) => {
        console.log(response);
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
            this.userData.setUserData({email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']});
        });
      });
  }
  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
