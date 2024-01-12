import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Patient } from 'src/app/model/patient';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { doctor } from 'src/app/model/doctor';
import { book } from 'src/app/model/book';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from 'src/app/shared/blockchain.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocumentsComponent } from 'src/app/modules/patient/view-documents/view-documents.component';
import { ViewDoctorDocComponent } from '../viewDoctorDoc/view-doctor-doc/view-doctor-doc.component';
import { DoctorDOcComponent } from '../viewDoctorDoc/DoctorDoc/doctor-doc/doctor-doc.component';
import { FilesharedocComponent } from '../filesharedoc/filesharedoc.component';

@Component({
  selector: 'app-documentdoc',
  templateUrl: './documentdoc.component.html',
  styleUrls: ['./documentdoc.component.css']
})
export class DocumentdocComponent implements OnInit{
  page: number = 1;
  count: number = 0;
  tableSize: number= 8;
  tableSizes : any = [5,10,15,20];

  // patientObj : Patient = {
  //   id: '',
  //   first_name: '',
  //   last_name: '',
  //   age: '',
  //   address:'',
  //   mobileno:'',
  //   document:'',
  //   email: ''
  // };

  id:string='';
  first_name:string ='';
  last_name:string ='';
  age:string ='';
  address:String='';
  mobileno:String='';
  document: String='';
  bookDetails!: book[];
  patientId!: string;
  patientList : Patient[] =[];
  doctorID!: string;
  public downloadURL !: string;
  patientid!: string;

  constructor(private crud:DataService ,
    private dialog: MatDialog,
    public bs: BlockchainService,
    public router: ActivatedRoute,
             private storage: AngularFireStorage){}

  ngOnInit(){
    this.router.queryParams.subscribe(params => {
      this.doctorID = params['DoctorId'];
    })

    // const jwtToken = localStorage.getItem('doctorjwt');
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblVzZXIiOnsiZW1haWxWZXJpZmllZCI6ZmFsc2UsImlzQW5vbnltb3VzIjpmYWxzZSwiZ2VuZGVyIjoibWFsZSIsIm5hbWUiOiJUaGFyaW5kdSIsImlkIjoia3h4djFKMnNEVGFRQk0xR1BLVFNEcldQY2JNMiIsInVzZXJUeXBlIjoiUGF0aWVudCIsImVtYWlsIjoiZWVlZWVAZ21haWwuY29tIiwiYWdlIjo3fSwiaWF0IjoxNjk3NTIyMDgzfQ.LF2uv6hclIB56WwnIaIwLrhZQZTa3zSmCFdqc6h4W6o"

    this.bs.getReceiveFile(jwtToken).subscribe((res: any) => {
      console.log(res);
      const asset = res.assetId;
      this.bs.downloadFile(jwtToken, asset).subscribe((res: any) => {
        this.downloadURL = res;
        console.log(this.downloadURL);
      })
    })

    this.crud.getAcceptedDetailsById(this.doctorID).then((res:any) => {
      for(let doctor of res) {
        this.bookDetails = res
        this.patientid = doctor.acceptedpatientID;
            this.crud.getPatientDataByID(doctor.acceptedpatientID).then (res => {
              this.patientList = res
            })
      }
    })
  
   }

   openDocumentDialog(patientID: string) {
    this.dialog.open(DoctorDOcComponent,{
      data: {patientID}
    })
  }

  openDownloadDocumentDialog(patientID: string) {
    this.dialog.open(FilesharedocComponent,{
      data: {patientID}
    })
  }

   
//   getAllPatients(){
//     this.data.getAllPatients().subscribe(res => {
//       this.patientList = res.map((e:any) => {
//         const data =e.payload.doc.data();
//         data.id = e.payload.doc.id;
//         console.log(data);
//         return data;
     
//       }
//       )
//       console.log(this.patientList.values)

//     }, (_err:any) => {
//       alert('Error while fetching patient data');
//       console.log(this.patientList.values)
//     })
//   }



 


// UpdatePatient(){


// }


   
// onTableDataChange(event:any){
//       this.page =event;
//       this. getAllPatients();
//     }

//     onTableSizeChange(event: any):void{
//       this.tableSize =event.target.value;
//       this.page = 1;
//       this. getAllPatients();
//     }
// }
  }
