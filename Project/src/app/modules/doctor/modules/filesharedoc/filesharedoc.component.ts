import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Patient } from 'src/app/model/patient';
import { DataService } from 'src/app/shared/data.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { book } from 'src/app/model/book';
import { ViewDocumentPatientComponent } from 'src/app/modules/patient/modules/view-document-patient/view-document-patient.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filesharedoc',
  templateUrl: './filesharedoc.component.html',
  styleUrls: ['./filesharedoc.component.css']
})
export class FilesharedocComponent implements OnInit {


  public viewDocuments!: FormGroup
  patients!: Patient[];
  patientID!: string; 
  bookDetails!: book[];

  constructor(
    public crudAPI: DataService,
    private dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {patientID: string} ) {
  }

  ngOnInit() {
    this.patientID = this.data.patientID;
    this.crudAPI.getAllDocumentsByID(this.patientID).then(res => {
      this.bookDetails = res;
      // for(let details of this.bookDetails){
      //   console.log(details.documents[0].url);
      // }
    })
  }

  downloadDocumentView(documentURL: string, docName: string){

      this.http.post('http://127.0.0.1:8000/secure_image', 
    {"url":documentURL},  { responseType: 'blob' })  
    .subscribe((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.target = '_blank';
      anchor.download = 'file_name'; // Set the desired file name here
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });

  
  }

  deleteDocuments () {
    this.patientID = this.data.patientID;
    this.crudAPI.deleteAllDocuments(this.patientID);
    this.dialog.closeAll();
  }
  
}
