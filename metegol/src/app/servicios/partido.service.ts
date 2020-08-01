import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Partido } from '../clases/partido';
@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(
    private db: AngularFirestore,
    private dataService: DataService

  ) { }

  async saveJugadores(item){
    console.log("save", item)
    item.id=this.db.createId();   
    this.db.collection('partido').doc(item.id).set(Object.assign({}, item))
  
  
  }

  getAllPartidos():Observable<Partido[]>{
    return this.dataService.getAll('partido');
  }

  updatePartido(collection: string, id: string, object: Partido) {
    return this.dataService.update(collection, id, Object.assign({},object));
  }
}
