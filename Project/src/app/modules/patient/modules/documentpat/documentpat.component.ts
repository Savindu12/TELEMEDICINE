import { Component, OnInit, ViewChild } from '@angular/core';
import { doctor } from 'src/app/model/doctor';
import { Patient } from 'src/app/model/patient';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from 'src/app/shared/data.service';
import { AngularFirestore } from '@angular/fire/compat/Firestore';
import { MatDialog } from '@angular/material/dialog';
import { FilesharepatComponent } from '../filesharepat/filesharepat.component';
import { PatientService } from 'src/app/shared/patient.service';
import { ViewDocumentsComponent } from '../../view-documents/view-documents.component';
import { book } from 'src/app/model/book';
import { BlockchainService } from 'src/app/shared/blockchain.service';
import { log } from 'console';

@Component({
  selector: 'app-documentpat',
  templateUrl:'./documentpat.component.html',
  styleUrls: ['./documentpat.component.css']
})
export class DocumentpatComponent implements OnInit{

  file: File | null = null;
  public documentForm!: FormGroup;
  PatientID!: string;
  email!: string;
  bookDetails!: book[];
  doctors!: doctor[];
  patientId!: string;
  doctorId!: string;
  isPopupOpen: boolean = false;
  isDocumentPopupOpen: boolean = false;

  constructor(
    private afs:AngularFirestore,
    public fb: FormBuilder,
    public bs: BlockchainService,
    private storage: AngularFireStorage,
    public crud:DataService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private patientService: PatientService
    ){}

  ngOnInit(){
    this.router.queryParams.subscribe(params => {
      this.patientId = params['PatientId'];
      sessionStorage.setItem('patientid', this.patientId);
    })
    this.patientId = sessionStorage.getItem('patientid') || '';

    this.crud.getBookedDoctorDetailsByCollection(this.patientId).then((res) => {
      this.bookDetails = res
      for(let doctor of res)
      {
        this.doctorId = doctor.bookDoctorID
        console.log(doctor.date);
        
        this.crud.getDoctorDataByID(this.doctorId).then((res) => {
          this.doctors = res;
        })
      }
    })
   }

   getPatientId(email:string) {
    this.crud.getPatientByEmail(email).subscribe(res => {
      this.PatientID = res[0].payload.doc['id'];
    });
  }

   Document () {
    this.documentForm = this.fb.group({
      document: ['']
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  async onFileChange(){
    const file = document.getElementById('doc') as HTMLInputElement;

    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblVzZXIiOnsiZW1haWxWZXJpZmllZCI6ZmFsc2UsImlzQW5vbnltb3VzIjpmYWxzZSwiZ2VuZGVyIjoibWFsZSIsIm5hbWUiOiJUaGFyaW5kdSIsImlkIjoia3h4djFKMnNEVGFRQk0xR1BLVFNEcldQY2JNMiIsInVzZXJUeXBlIjoiUGF0aWVudCIsImVtYWlsIjoiZWVlZWVAZ21haWwuY29tIiwiYWdlIjo3fSwiaWF0IjoxNjk3NTIyMDgzfQ.LF2uv6hclIB56WwnIaIwLrhZQZTa3zSmCFdqc6h4W6o"

    if(file && file.files && file.files.length > 0) {
      const selectedFile = file.files[0];
      const path = `patient/${this.email}/document/${selectedFile.name}`;
      const uploadTask = await this.storage.upload(path, selectedFile);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
      console.log(selectedFile.name);
      this.afs.collection('/patients').doc(this.patientId).update({
          Documentname: selectedFile.name,
          Documenturl: url
      });
    }
  }

  uploadFile() {
    this.onFileChange();
    console.log(this.documentForm.value);
    // this.crud.updatePatientDocumentByID(this.patientId,this.documentForm.value);
  }

  openPatientDialog(doctorID: string): void {
      this.dialog.open(FilesharepatComponent, {
        data: {doctorID},
      });
  }

  openDocumentDialog(patientID: string) {
    this.dialog.open(ViewDocumentsComponent,{
      data: {patientID}
    })
  }



}