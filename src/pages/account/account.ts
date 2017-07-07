import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  public userProfile:firebase.database.Reference;
  public user: any;
  public profile: any = {

  }
  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData) {
      firebase.auth().onAuthStateChanged( (user:any) => {
        if (user){
          this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
          console.log(this.userProfile);
          this.user = user;
        }
      });
  }

  ngAfterViewInit() {
     this.getUserProfile().on('value', (userProfileSnapshot:any) => {
      this.profile = userProfileSnapshot.val();
    });
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  updateProfile(occupation: string,district: string,mandal: string,state: string,phoneNumber: string): firebase.Promise<void> {
    console.log(occupation,district,mandal,state);
    return this.userProfile.update({
        occupation:occupation,
        district:district,
        mandal:mandal,
        state:state,
        phoneNumber:phoneNumber
    });
  }


  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
