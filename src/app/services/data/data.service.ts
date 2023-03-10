import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { finalize, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public idUni: string = '';
  public nombreCompleto = '';
  public ciudad = '';
  public datos!: Observable<any>;
  public listaUnis : any [] = [];
  public listaFacus : String [] = [];

  private urlUniversidades = "/api/universidades";

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afStorage : AngularFireStorage,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private http: HttpClient
  ) {
  }

  getUniversidades() : Observable<any>{
    return this.http.get<any>(this.urlUniversidades);
  }

  getDatosUni(id: number) {
    return this.http.get<any>("/api/universidades/" + id);
  }

  getFacultades(uni: string) {
    this.afs.collection("universidades/" + uni + "/facultades").get().subscribe((query) => {
      query.forEach((facu) => {
        this.listaFacus.push(facu.id);
        console.log("facultades: " + facu.id);
      })
    });
  }
}
