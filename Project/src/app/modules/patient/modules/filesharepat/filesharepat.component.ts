import { Component,Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from 'src/app/shared/data.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Patient } from 'src/app/model/patient';
import { ActivatedRoute } from '@angular/router';
import { doctor } from 'src/app/model/doctor';
import { DatadocService } from 'src/app/shared/datadoc.service'; 
import { AuthService } from 'src/app/shared/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { PatientService } from 'src/app/shared/patient.service';
import { AngularFirestore } from '@angular/fire/compat/Firestore';
import { BlockchainService } from 'src/app/shared/blockchain.service';
import { log } from 'console';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-filesharepat',
  templateUrl: './filesharepat.component.html',
  styleUrls: ['./filesharepat.component.css']
})
export class FilesharepatComponent implements OnInit {

  public documentForm!: FormGroup;
  patientList !: any[];
  email!:string ;
  PatientID!: string;
  doctors: doctor[] = [];
  documents!: string[];
  patientId!: string;

  constructor( 
    private data:DataService,
    private DatadocService:DatadocService,
    public auth : AuthService,
    public fb: FormBuilder,
    public bs: BlockchainService,
    public afs: AngularFirestore,
    public crud:DataService,
    private router: ActivatedRoute,
    private storage: AngularFireStorage,
    public dialog: MatDialog, public dialogRef: MatDialogRef<FilesharepatComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: {doctorID: string},
    ) {}

  ngOnInit() {
    this.DatadocService.getdoctors().subscribe((doctors: doctor[]) =>{
      // console.log(doctors.map(doctor => doctor.first_name));
       this.doctors=doctors;
    });

    this.router.queryParams.subscribe(params => {
      this.patientId = params['PatientId'];
      sessionStorage.setItem('patientid', this.patientId);
    })

    this.patientId = sessionStorage.getItem('patientid') || '';
    this.Document();
    this.getAllPatients();
  }

    
  Document () {
    this.documentForm = this.fb.group({
      name: [''],
      url: ['']
    })
  }

  async onFileChange(){
    const file = document.getElementById('file_input') as HTMLInputElement;
    if(file && file.files && file.files.length > 0) {
      const selectedFile = file.files[0];

      firebase.firestore().collection('patientBook').doc(this.patientId).get()
      .then((doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
        if (doc.exists) {
          const data = doc.data();
          const doctorID = data && data['bookDoctorID'];
          const jwtTokens = localStorage.getItem('jwt');
          const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblVzZXIiOnsiZW1haWxWZXJpZmllZCI6ZmFsc2UsImlzQW5vbnltb3VzIjpmYWxzZSwiZ2VuZGVyIjoibWFsZSIsIm5hbWUiOiJUaGFyaW5kdSIsImlkIjoia3h4djFKMnNEVGFRQk0xR1BLVFNEcldQY2JNMiIsInVzZXJUeXBlIjoiUGF0aWVudCIsImVtYWlsIjoiZWVlZWVAZ21haWwuY29tIiwiYWdlIjo3fSwiaWF0IjoxNjk3NTIyMDgzfQ.LF2uv6hclIB56WwnIaIwLrhZQZTa3zSmCFdqc6h4W6o"

          this.bs.shareFile(selectedFile, doctorID, jwtToken)
          }
        })
      const path = `Patients/Documents/${selectedFile.name}`;
      const uploadTask = await this.storage.upload(path, selectedFile);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);

      this.documentForm.patchValue ({
        name: selectedFile.name,
        url: url
      })
    }
  }

  uploadFile() {
    this.onFileChange();
    this.patientId = sessionStorage.getItem('patientid') || '';
    this.crud.updatePatientDocument(this.patientId,this.documentForm.value);
    this.crud.updateDoctorDocument(this.datas.doctorID,this.documentForm.value);
    this.dialog.closeAll();
 }

getAllPatients(){
  this.data.getAllPatients().subscribe(res => {
    this.patientList = res.map((e:any) => {
      const data =e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })

  }, (err:any) => {
    alert('Error while fetching patient data');

  })
}
  }



