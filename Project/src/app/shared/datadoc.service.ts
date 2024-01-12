
import { Injectable } from '@angular/core';
import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from'@angular/fire/compat/Firestore';
import { doctor } from '../model/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatadocService {
  // doctorsCollection: AngularFirestoreCollection<doctor>  ;
  // doctors:Observable<doctor[]>;

  constructor(private firestore : AngularFirestore) {
    // this.doctorsCollection = this.firestore.collection<doctor>('doctors');
    // this.doctors = this.doctorsCollection.valueChanges();
   }
  
   getdoctors(): Observable<doctor[]> {
    return this.firestore.collection<doctor>('doctors').valueChanges();
  }

  getDoctorList() {
    return new Promise<doctor[]>((resolve, reject) =>{ 
      this.firestore
        .collection('doctors')
        .get()
    })
  }


}



