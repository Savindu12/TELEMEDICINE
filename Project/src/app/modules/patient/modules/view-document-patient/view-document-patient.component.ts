import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { book } from 'src/app/model/book';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';
import * as pdfjsLib from 'pdfjs-dist';
import { log } from 'console';
import { error } from 'protractor';

@Component({
  selector: 'app-view-document-patient',
  templateUrl: './view-document-patient.component.html',
  styleUrls: ['./view-document-patient.component.css']
})
export class ViewDocumentPatientComponent implements OnInit {

  private docDetails!: book[];
  patientId!: string;
  patients!: string[];
  patientName!: string;
  email!: string;
  phoneNum!: number;
  address!: string;
  Birthdate!: string;
  isLoading !: boolean;
  weight!: number;
  month!: string;
  urls!: any;
  viewer = 'google';
  selectedType = 'pptx'; //'docx';
  // doc = 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx';
  // doc = 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx';
  doc = 'https://firebasestorage.googleapis.com/v0/b/medichain-c22e5.appspot.com/o/Patients%2FDocuments%2FMedical_report1.pdf?alt=media&token=68588027-a16a-4df5-b096-b12af52ce984';
  pngImages: string[] = [];


  constructor(
    private crud: DataService,
    private http: HttpClient,
    private router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {document: any}
  ){}

  async convertPdfToPng(pdfUrl: string): Promise<string[]> {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const pageCount = pdf.numPages;
    const pngImages = [];

    for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext('2d');
      if (context) { // Check if context is not null
        await page.render({ canvasContext: context, viewport }).promise;

        const pngDataUrl = canvas.toDataURL('image/png');
        pngImages.push(pngDataUrl);
      } else {
        console.error('Canvas 2D context is null.');
      }
    }

    console.log("hello",pngImages);
    

    return pngImages;
  }
  
  async ngOnInit() {

    console.log(this.data.document.docURL);
    this.urls = this.data.document.docURL;
    
    // this.isLoading = true;
    // this.http.post('http://127.0.0.1:8000/secure_image', 
    // {"url":this.data.document.docURL},  { responseType: 'blob' })  
    // .subscribe((blob: Blob) => {
    //   const url = URL.createObjectURL(blob);
    //   this.urls = url;
    // });
    
    
    
    // const formData = new FormData();
    // formData.append('upload_file', img);

    // this.http.post('http://127.0.0.1:8000/hide_sensitive_data_ocr', formData).subscribe(response => {
    //   console.log(response);
    // });



    // this.router.queryParams.subscribe(params => {
    //   this.patientId = params['PatientId'];
    // });
  }

  sendBinaryCanvasImageToBackend(binaryData: ArrayBuffer) {
    const formData = new FormData();
    formData.append('file_upload', new Blob([binaryData]));
    this.http.post('http://127.0.0.1:8000/hide_sensitive_data_ocr', formData).subscribe(response => {
      console.log(response);
    });
  }


  private captureCanvasImage(canvas: any, callback:any) {
    canvas.toBlob((blob: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryData = reader.result;
        callback(binaryData);
      };
      reader.readAsArrayBuffer(blob);
    }, 'image/png');
  }

  downloadAndConvertImage(url: string, filename: string): Promise<void> {
    return this.http.get(url, { responseType: 'blob' })
      .toPromise()
      .then((blob: any) => {
        const file = new File([blob], filename, { type: 'image/png' });
        this.saveFile(file);
      });
  }

  private saveFile(file: File): void {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(file);
    a.href = objectUrl;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}
