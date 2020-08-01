import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from "rxjs/operators";
import { Usuario } from '../clases/usuario';
import { Partido } from '../clases/partido';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFirestore) { }

  getAll(collection):Observable<any[]>{
    return this.db.collection(collection).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          
          const id = a.payload.doc.id;
          
          return { id, ...(data as any) } ;
        });
      })
    );
  }
  setStatus(collection, id, status){
    return this.update(collection, id, { 'estado': status });
  }

  update(collection: string, id:string, objeto:any) {
    return this.db.doc<any>(`${collection}/${id}`).update(objeto);
  }

  deleteDocument(collection: string, id: string) {
    return this.db.doc<any>(`${collection}/${id}`).delete();
  }

  add(collection, object){
    return this.db.collection(collection).add(Object.assign({}, object));
  }

  getOne(collection:string, id:string): Observable<any> {
    return this.db.collection(collection).doc<any>(id).valueChanges().pipe(
      take(1),
      map(element => {
        element.id = id;
        return element
      })
    );
  }

  //Traer un usuario
  getOneUsuario(collection, id){
      return this.db.collection(collection).snapshotChanges().pipe(map(res =>{
        return res.map(i => {
          let data = i.payload.doc.data() as Usuario;
          if (id==i.payload.doc.id){
            data.id = i.payload.doc.id;
            console.log("data", data)
          }
          return data;
        })
      })); 
    
  }


 

    //Traer un producto
  getOnePartido(collection, id){
    return this.db.collection(collection).snapshotChanges().pipe(map(res =>{
      return res.map(i => {
        let data = i.payload.doc.data() as Partido;
        if (id==i.payload.doc.id){
          data.id = i.payload.doc.id;
          console.log("data", data)
        }
        return data;
      })
    })); 

  }




  


  setData(collection, id, data){
    return this.db.collection(collection).doc(id).set(Object.assign({}, data));
  }
 
}
