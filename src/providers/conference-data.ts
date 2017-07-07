import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ConferenceData {
  data: any;
  constructor(public http: Http, public user: UserData,public afd: AngularFireDatabase) { 
    
  }

  public getPosts(){
    return this.afd.list('/posts');
    /*
    this.afd.list('/posts', { preserveSnapshot: true}).subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          console.log(snapshot.key, snapshot.val());
        });
    }); */
  }
  public getMembers(){
    return this.afd.list('/members');
  }

  load(){

  }
  getSpeakers() {
    return this.data;
  }

  getTracks() {
    return this.data;
  }

  getMap() {
    return this.data;
  }

}
