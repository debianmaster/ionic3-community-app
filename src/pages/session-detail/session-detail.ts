import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  post: any;

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
    this.post=this.navParams.get("postData");
    console.log(this.post);
  }
}
