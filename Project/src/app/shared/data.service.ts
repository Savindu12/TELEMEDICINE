import { Injectable } from '@angular/core';
import{AngularFirestore} from'@angular/fire/compat/Firestore';
import { doctor } from '../model/doctor';
import { Patient } from '../model/patient';
import { Document } from '../model/document';
import { book } from '../model/book';
import { Observable, map } from 'rxjs';
import { accpetedPatients } from '../model/acceptedPatients';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  patientDetails: any;
  doctorDetails:any;
  private dataInternal!: number;

  constructor(private afs : AngularFirestore) { }

  setData(id: number){
    this.dataInternal = id;
  }

  getData(){
    return 10;
  }

  getPatientData(patientId: string) {
    return this.afs.collection('patients').doc(patientId).valueChanges();
  }


  setPatientDetails(details: any) {
    this.patientDetails = details;
  }

  getpatientDetails() {
    return this.patientDetails;
  }
  
  storeDoctorID(doctorID: string, patientID: string, meetingID: string) {
    this.afs.collection('doctormeeting').doc(patientID).set({
      meetingID: meetingID,
      doctorID: doctorID,
      patientID: patientID
    })
  }

  getMeetingID(patientID: string) {
    return this.afs.collection('doctormeeting').doc(patientID).valueChanges();
  }

  getBookedPatientDetails() {
    return this.afs.collection('patientBook').valueChanges();
  }

  getdoctorData(doctorId: string) {
    return this.afs.collection('doctors').doc(doctorId).valueChanges();
  }

  getDoctorDataByID(doctorID: string) {
    return new Promise<doctor[]>((resolve, reject) => {
      this.afs
          .collection('doctors')
          .doc(doctorID)
          .get()
          .subscribe((result) => {
            if(result.exists) {
              const doctorData = result.data() as doctor;
              const doctor: doctor = {...doctorData};
              resolve([doctor])
            }
            else {
              reject("could not find doctor data")
            }
          });
    })
  }

  getPatientDataByID(patientID: string) {
    return new Promise<Patient[]>((resolve, reject) => {
      this.afs
          .collection('patients')
          .doc(patientID)
          .get()
          .subscribe((result) => {
            if(result.exists) {
              const patientData = result.data() as Patient;
              const patient: Patient = {...patientData};
              resolve([patient])
            }
            else {
              reject("could not find doctor data")
            }
          });
    })
  }

  getAcceptedPatientDataByID(doctorID: string) {
    return new Promise<accpetedPatients[]>((resolve, reject) => {
      this.afs
          .collection('accepedPatients')
          .doc(doctorID)
          .get()
          .subscribe((result) => {
            if(result.exists) {
              const patientData = result.data() as accpetedPatients;
              const patientList: accpetedPatients = {...patientData};
              resolve([patientList])
            }
            else {
              reject("could not find doctor data")
            }
          });
    })
  }

  acceptPatientBooking(patientID: string, doctorID: string, coinID: string, dateTime: string, time: string){
    this.afs.collection('patientBook').doc(patientID).set({
      patientID: patientID,
      bookDoctorID: doctorID,
      coinID: coinID,
      date: dateTime,
      time: time,
      documents: []
    })
  }

  acceptPatientBookingView(patientID: string, doctorID: string, coinID: string, dateTime: string, time: string){
    this.afs.collection('patientBooks').doc(patientID).set({
      patientID: patientID,
      bookDoctorID: doctorID,
      coinID: coinID,
      date: dateTime,
      time: time,
      documents: []
    })
  }

  purchaseWallet(CoinID: string, purchasedDate: string, price: number, quantity: number, patientID: string) {
    this.afs.collection('PatientWallet').doc(patientID).set({
      patientID: patientID,
      id:CoinID,
      date:purchasedDate,
      price: price,
      quantity: quantity
    })
  }

  getWalletDetailsByID(patientID: string) {
    return this.afs.collection('PatientWallet').doc(patientID).valueChanges();
  }

  deleteWalletDetailsByID(patientID: string) {
    this.afs.collection('PatientWallet').doc(patientID).delete();
  }

  acceptPatient(patientID: string, doctorID: string, dateTime: string, time: string){
    this.afs.collection('accepedPatients').doc(doctorID).set({
      DoctorID: doctorID,
      acceptedpatientID: patientID,
      date: dateTime,
      time: time,
      documents: []
    })
  }


  deletepatientBook(patientID: string) {
    this.afs.collection('patientBook').doc(patientID).delete();
  }

  getAcceptedDetailsById(doctorID: string) {
    return new Promise<accpetedPatients[]>((resolve, reject) => {
      this.afs
          .collection('accepedPatients')
          .doc(doctorID)
          .get()
          .subscribe((result) => {
            if(result.exists) {
              const bookData = result.data() as accpetedPatients;
              const book: accpetedPatients = {...bookData};
              resolve([book]);
            }
            else {
              reject("could not find doctor data")
            }
          });
    });
  }
 

  getBookedDoctorDetailsById(patientID: string) {
    return new Promise<book[]>((resolve, reject) => {
      this.afs
          .collection('accepedPatients')
          .doc(patientID)
          .get()
          .subscribe((result) => {
            if(result.exists) {
              const bookData = result.data() as book;
              const book: book = {...bookData};
              resolve([book]);
            }
            else {
              reject("could not find doctor data")
            }
          });
    });
  }

  getBookedDoctorDetailsByCollection(patientID: string) {
    return new Promise<book[]>((resolve, reject) => {
      this.afs
          .collection('patientBooks')
          .doc(patientID)
          .get()
          .subscribe((result) => {
            if(result.exists) {
              const bookData = result.data() as book;
              const book: book = {...bookData};
              resolve([book]);
            }
            else {
              reject("could not find doctor data")
            }
          });
    });
  }

   getBookedPatientDetailsById(patientID: string) {
    return new Promise<book[]>((resolve, reject) => {
      this.afs
          .collection('patientBook')
          .doc(patientID)
          .get()
          .subscribe((result) => {
            if(result.exists) {
              const bookData = result.data() as book;
              const book: book = {...bookData};
              resolve([book]);
            }
            else {
              reject("could not find doctor data")
            }
          });
    });
  }

  getDoctorDetailsByID(patientID: string) {
    return this.afs.collection('patientBook').doc(patientID).valueChanges();
  }

  
  getDocDetailsByID() {
    return this.afs.collection('patientBook').valueChanges();
  }

  setdoctorDetails(details: any) {
    this.doctorDetails = details;
  }

  getdoctorDetails() {
    return this.doctorDetails;
  }
  


  //add patient
  addPatient(uid: string, patient : Patient) {
    this.afs.collection('patients').doc(uid).update({
      first_name : patient.first_name,
      last_name: patient.last_name,
      age: patient.age,
      email: patient.email,
      address: patient.address,
      mobileNo: patient.mobileno
    })

  }

//get all patient
getAllPatients(){
  return this.afs.collection('/patientBook').snapshotChanges().pipe(
    map (actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as { patientID: string, otherData: any }; // Replace 'otherData' with other fields you have
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
}

getPatientByEmail(email:string){
  return this.afs.collection('/patients', ref => ref.where('email', '==', email))
  .snapshotChanges();}

//delete patient
deletePatient(patient :Patient,){
  return this.afs.doc('/patients/'+patient.id).delete();
}

// updatePatientDocumentByID (patientId: string, documentData: string) {
//   const patientDocRef = this.afs.collection('patients').doc(patientId)
//   patientDocRef.get().subscribe((result) => {
//     if(result.exists) {
//       const currentDocuments = result.data() as Document;
//       if(Array.isArray(currentDocuments.documents)){
//         currentDocuments.documents.push(documentData);
//         this.afs.collection('patients').doc(patientId).update({
//           documents : currentDocuments.documents
//         });
//       } else {
//         console.error("Patient Documents not exists")
//         patientDocRef.set({
//           Documents: [documentData]
//         }, {merge: true});
//       }
//     }else {
//       console.error("Patient Documents not exists")
//     }
//   })
// }

updatePatientDocument (patientId: string, documentData: string) {
  this.afs.collection('patientBooks').doc(patientId).get().subscribe(doc => {
    if(doc.exists) {
      const currentDocuments = doc.data() as Patient;
      if(Array.isArray(currentDocuments.documents)) {
        currentDocuments.documents.push(documentData);
        this.afs.collection('patientBooks').doc(patientId).update({
          documents : currentDocuments.documents
        })
      }
      else {
        this.afs.collection('patientBooks').doc(patientId).set({
          documents : [currentDocuments.documents]
        }, {merge: true});
      }
    } else {
      console.error("Patient Documents not exists")
    }
  })
}

updateDoctorDocument (doctorID: string, documentData: string) {
  this.afs.collection('accepedPatients').doc(doctorID).get().subscribe(doc => {
    if(doc.exists) {
      const currentDocuments = doc.data() as accpetedPatients;
      if(Array.isArray(currentDocuments.documents)) {
        currentDocuments.documents.push(documentData);
        this.afs.collection('accepedPatients').doc(doctorID).update({
          documents : currentDocuments.documents
        })
      }
      else {
        this.afs.collection('accepedPatients').doc(doctorID).set({
          documents : [currentDocuments.documents]
        }, {merge: true});
      }
    } else {
      console.error("Patient Documents not exists")
    }
  })
}

getAllDocumentsByID (patientID: string) {
  return new Promise<book[]>((resolve, reject) => {
    this.afs
        .collection('patientBooks')
        .doc(patientID)
        .get()
        .subscribe((result) => {
          if(result.exists) {
            const patientData = result.data() as book;
            const patient: book = {...patientData};
            resolve([patient]);
          }
          else reject('Could not find result');
        });
  })
}

getAllDocumentsByDoctorID (doctorID: string) {
  return new Promise<accpetedPatients[]>((resolve, reject) => {
    this.afs
        .collection('accepedPatients')
        .doc(doctorID)
        .get()
        .subscribe((result) => {
          if(result.exists) {
            const patientData = result.data() as accpetedPatients;
            const patient: accpetedPatients = {...patientData};
            resolve([patient]);
          }
          else reject('Could not find result');
        });
  })
}

getAllDocuments (patientId: string) {
  return this.afs.collection('patients').doc(patientId).valueChanges()
}


//update patient
// updatePatient(patient : Patient){
//   this.deletePatient(patient);
//   this.addPatient(patient);
// }



  //add doctor
  adddoctor(uid: string, doctor : doctor ) {
    this.afs.collection('doctors').doc(uid).update({
      first_name: doctor.first_name,
      last_name: doctor.last_name,
      age: doctor.age,
      address: doctor.address,
      mobileNo: doctor.mobileNo,
      specialist: doctor.specialist,
      email: doctor.email
    })
  }
  

//get all doctor
getAlldoctors(){
  return this.afs.collection('/doctors').snapshotChanges();
}

//delete doctor
deletedoctor(doctor :doctor){
  return this.afs.doc('/doctors/'+doctor.id).delete();
}

deleteAllDocuments(bookedID: string) {
  this.afs.collection('patientBook').doc(bookedID).update({
    documents: []
  })
}

}





