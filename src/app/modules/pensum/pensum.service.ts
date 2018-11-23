import { Injectable } from '@angular/core';
import * as database from '../../../../node_modules/electron-db';

const db = database;


@Injectable({
  providedIn: 'root'
})
export class PensumService {

  public db;
  constructor() {
    this.db = db;
    this.db.createTable('pensum', (succ, msg) => {
      // succ - boolean, tells if the call is successful
      console.log('Success: ' + succ);
      console.log('Message: ' + msg);
    });

    console.log(db);

  }
}
