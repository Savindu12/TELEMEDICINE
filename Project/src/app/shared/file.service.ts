import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/Firestore';
import { fileMetaData } from '../model/file-meta-data';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private afs:AngularFirestore,
            private fireStorage:AngularFireStorage ) { }
            
              saveMataDataOfFile(fileObj : fileMetaData) {
               
                const fileMeta ={
                  id:'',
                  name :fileObj.name,
                  url :fileObj.url,
                  size:fileObj.size
                }
                fileMeta.id =this.afs.createId();
                this.afs.collection('/patients').add(fileMeta);
               }


              getAllfiles(){
                this.afs.collection('/patients').snapshotChanges();

              }

              deleteFile(fileMete :fileMetaData){
                this.afs.collection('/patients').doc(fileMete.id).delete();
                this.fireStorage.ref('/patients/'+fileMete.name).delete();
              }
              
              }
            


// updatePatientDocument (patientId: string, documentData: string) {
//   return this.afs.doc('/patients' + patientId).update({
//     document: documentData
//   });









