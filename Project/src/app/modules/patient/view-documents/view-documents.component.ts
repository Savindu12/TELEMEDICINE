import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Patient } from 'src/app/model/patient';
import { DataService } from 'src/app/shared/data.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { book } from 'src/app/model/book';
import { ViewDocumentPatientComponent } from '../modules/view-document-patient/view-document-patient.component';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css']
})
export class ViewDocumentsComponent implements OnInit {
  
  public viewDocuments!: FormGroup
  patients!: Patient[];
  patientID!: string; 
  bookDetails!: book[];
  
  constructor(
    public crudAPI: DataService,
    private dialog: MatDialog,
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

  openDocumentView(documentURL: string, docName: string){
    this.dialog.open(ViewDocumentPatientComponent, {
      data: {document: {
        docName: docName,
        docURL: documentURL
      }},
      height: "40rem"
    });
  }

  deleteDocuments () {
    this.patientID = this.data.patientID;
    this.crudAPI.deleteAllDocuments(this.patientID);
    this.dialog.closeAll();
  }
}
