import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ganadores } from '../clases/ganadores';
import { DataService } from './data.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GanadoresService {

  constructor(
    private db: AngularFirestore,
    private dataService: DataService

  ) { }

  async saveGanadores(item){
    console.log("save", item)
    item.id=this.db.createId();   
    this.db.collection('ganadores').doc(item.id).set(Object.assign({}, item))
  
  
  }

  getAllGanadores():Observable<Ganadores[]>{
    return this.dataService.getAll('ganadores');
  }

  updateGanadores(collection: string, id: string, object: Ganadores) {
    return this.dataService.update(collection, id, Object.assign({},object));
  }
}
