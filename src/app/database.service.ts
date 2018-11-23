import { Injectable } from '@angular/core';
import * as database from '../../node_modules/electron-db';
import { NumericDictionary } from 'lodash';
const db = database;

export interface Seccion {
  id: string;
  numero: string;
  horaio: string;
  periodo: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

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
