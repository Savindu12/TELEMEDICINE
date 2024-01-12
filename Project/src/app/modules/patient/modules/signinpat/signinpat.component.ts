import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service'; 
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/model/user';
import * as RecordRTC from'recordrtc';
import{DomSanitizer,SafeUrl} from'@angular/platform-browser';
import axios from 'axios';
import { type } from 'os';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { map } from 'rxjs';

@Component({
  selector: 'app-signinpat',
  templateUrl: './signinpat.component.html',
  styleUrls: ['./signinpat.component.css']
})
export class SigninpatComponent {
  title ='audio-record';
  record:any;
  recording = false;
  isLoading = false;
  url: any;
  error:any;
  options:any;
  private readonly mimeType = 'audio/webm';
  faMicrophone = faMicrophone;
  faMicroSlash = faMicrophoneSlash;
    signinForm: FormGroup;
    loading: boolean = false;
  
    constructor(
      private fb: FormBuilder,
      private afAuth: AngularFireAuth,
      public Auth: AuthService,
      private router: Router,
      private domSanitizer: DomSanitizer,
      public http: HttpClient
    ) {
      this.signinForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        role:['',Validators.required],
        document: ['']
      })
    }
    ngOnInit(): void {}
  
   

    responseMessage: string = '';
    
    // uploadFile(event: any): void {
    //   this.isLoading = true;
    //   var id = "9595"
    //   // sessionStorage.setItem('audioId', id);
    //   // console.log(id);
      
    //   let files = event.target.files[0];
    //   const formData = new FormData();
    //   formData.append('audio_file', files, files.name);
    //   this.http.post(`http://127.0.0.1:8000/prediction/${id}`, formData).subscribe
    //   ((res: any) => {
    //     let respose = res.command;
    //     this.isLoading = false;
    //     console.log(res.command);
    //   })
    // }

    uploadFile(event: any){
      let files = event.target.files[0];
      this.signinForm.patchValue({
        document: files
      })
    }

    usersubmit() {
    
      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;
      const role =this.signinForm.value.role;
      const document = this.signinForm.value.document;
      
      this.loading = false;
      
      const returnvalue = this.Auth.signInPatient(email, password, document);
      if(returnvalue == 1) {
        this.loading = false;
      }
      
    }

    
// sanitize(url: string) {
//   return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
// }

// startRecording(){
//   console.log('start');
//   this.recording = true;
//   let mediaConstraints ={
//     video:false,
//     audio:true,
//   };
//   navigator.mediaDevices.getUserMedia(mediaConstraints)
//   .then(this.successCallback.bind(this))
//   .catch(this.errorCallback.bind(this));
// }


// successCallback(stream: MediaStream) {
//   var options: {
//     mimeType: "audio/webm" | "audio/ogg" | undefined;
//   } = {
//     mimeType: 'audio/webm',
//   };

//   this.record = new RecordRTC.StereoAudioRecorder(stream, options);
//   this.record.record();
// }

// stopRecording() {
//   console.log('stop');
//   this.recording = false;
//   let mediaConstraints ={
//     video:false,
//     audio:true,
//   };
//   if (this.record && this.record.stop) {
//     mediaConstraints.audio = false;
//     this.record.stop(this.processRecording.bind(this));
//   }
// }

// processRecording(blob: Blob) {
//   this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
//   console.log('blob', blob);
//   console.log('url', this.url);
//   this.convertToMP3();
// }

// errorCallback(error:any){
//   this.error = 'can not play audio in your browser';

// }
// async convertToMP3() {
//   const apiKey = 'AIzaSyDUeR6rPE6OVC7nZ-HHn-7X3QYyK0ZSe1g';
//   const cloudConvertUrl = `https://api.cloudconvert.com/v2/convert`;

//   try {
//     const formData = new FormData();
//     formData.append('file', this.url?.toString());
//     formData.append('inputformat', this.mimeType.split('/')[1]);
//     formData.append('outputformat', 'mp3');

//     const response = await axios.post(cloudConvertUrl, formData, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         'Content-Type': 'multipart/form-data',
//       },
//       responseType: 'blob',
//     });

//     const mp3Blob = new Blob([response.data], { type: 'audio/mp3' });
//     this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(mp3Blob));
//     console.log('MP3 URL:', this.url);
//   } catch (error) {
//     console.error('Error converting audio:', error);
  

//   }
// }


}

 




 