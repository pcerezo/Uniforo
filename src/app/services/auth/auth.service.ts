import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public archivo : String = '';
  public nombreArchivo : string = '';
  public URLPublica : string = '';
  public porcentaje = 0;
  public finalizado = false;
  public archivoForm = new FormGroup( {
    archivo: new FormControl(null, Validators.required),
  });
  imagenes: any[] = [];

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afStorage : AngularFireStorage,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['home']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.href='home';
      // this.router.navigate(['home']);
    });
  }

  LanzarUpdateDisplayName(newDisplayName : string) {
    let user = JSON.parse(localStorage.getItem('user')!);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: newDisplayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    this.userData = userData;

    return this.afAuth.currentUser
      .then((u: any) => u.updateProfile({
        displayName: newDisplayName,
      }));
  }

  SetDisplayName(newDisplayName: string) {
    return this.LanzarUpdateDisplayName(newDisplayName);
  }

  CambioArchivo(event : any) {
    const user = JSON.parse(localStorage.getItem('user')!);
    let nombre = "/perfil-"+user.uid;

    if (event.target.files.length > 0) {
      this.archivo = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        console.log(reader.result);
        this.imagenes.push(reader.result);
        this.SubirArchivo(nombre, reader.result).then(urlImagen => console.log(urlImagen));
      }
      this.nombreArchivo = event.target.files[0].name;
      this.mensajeArchivo = 'Archivo seleccionado';
    }
    else {
      this.mensajeArchivo = 'Ningún archivo seleccionado';
    }
  }

  async SubirArchivo(nombre: string, base64: any) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const referencia = this.afStorage.ref(nombre);
    try{
      let respuesta = await referencia.child("/" + user.uid + "/" + nombre).putString(base64, 'data_url');
      console.log(respuesta);

      return await respuesta.ref.getDownloadURL();
    } catch(err) {
      console.log(err);

      return null;
    }
  }

  getImages() {
    
  }
}
