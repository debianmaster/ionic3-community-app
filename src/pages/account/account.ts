import { Component } from '@angular/core';

import { AlertController, NavController,Events } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  public userProfile:firebase.database.Reference;
  public user: any;
  public districts: any;
  public profile: any = {
        occupation:'',
        district:'',
        mandal:'',
        state:'',
        phoneNumber:'',
        isSingle:0,
        userInfo:{
          email: '',
          displayName:'',
          phoneNumber:'',
          gender:'',
          photoURL:''
        }
  }
  constructor(public alertCtrl: AlertController, public events: Events,public nav: NavController, public userData: UserData) {
      this.user=firebase.auth().currentUser;
      console.log(this.profile);
      if (this.user){
        this.userProfile = firebase.database().ref(`/userProfile/${this.user.uid}`);
        console.log(this.userProfile);
      }
      firebase.database().ref(`/districts`).on('value', (snapshot:any) => {
        console.log("get",snapshot.val());
        if(undefined!=snapshot.val()){
          this.districts = snapshot.val();
        }
      });
  }

  ngAfterViewInit() {
     this.getUserProfile().on('value', (userProfileSnapshot:any) => {
      console.log("get",userProfileSnapshot.val());
      if(undefined!=userProfileSnapshot.val()){
        this.profile = userProfileSnapshot.val();
      }
    });
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  updateProfile(obj: any){
    obj.userInfo={
      email: this.user.email,
      displayName:this.user.displayName || '',
      phoneNumber:this.user.phoneNumber || '',
      gender:this.user.gender || '',
      photoURL: this.user.photoURL || ''
    }
    console.log(obj);
    this.userProfile.update(obj);
    this.events.publish('user:updateProfile');
  }


  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
