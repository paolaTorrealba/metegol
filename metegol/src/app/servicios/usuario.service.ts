import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private afsAuth: AngularFireAuth,
    private db: AngularFirestore
    ){}
 
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     this.afsAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
  getUserById(userId) {
    return this.db.collection<Usuario>('usuarios', (ref) =>  ref.where ('id', '==', userId).limit(1)). valueChanges();   
  }
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
    this.afsAuth.auth.signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => { resolve(res) },
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(this.afsAuth.auth.currentUser){
        this.afsAuth.auth.signOut()
        .then(() => {
          console.log("Log Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  getCurrentUser(){
    return this.afsAuth.auth.currentUser;
  }

  getAuthStateChanged() {
    return new Promise((resolve, reject) => {
       const unsubscribe = this.afsAuth.auth.onAuthStateChanged(usuario => {
          unsubscribe();
          resolve(usuario);
          console.log(usuario)
       }, reject);
    });
  }

 
}