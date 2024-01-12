import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-doctor-doc',
  templateUrl: './view-doctor-doc.component.html',
  styleUrls: ['./view-doctor-doc.component.css']
})
export class ViewDoctorDocComponent implements OnInit {

  constructor(
    private crud: DataService,
    private http: HttpClient,
    private router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {document: any}
  ){}

  urls!: any;

  async ngOnInit() {

    console.log(this.data.document.docURL);
    // this.urls = this.data.document.docURL

    this.http.post('http://127.0.0.1:8000/secure_image', 
    {"url":this.data.document.docURL},  { responseType: 'blob' })  
    .subscribe((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      this.urls = url;
    });
  
  }

}
