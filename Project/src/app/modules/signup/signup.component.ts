import { Component, OnInit, NgZone, ɵɵclassMapInterpolate4, Type } from '@angular/core';
import { RecordServiceService } from 'src/app/shared/record-service.service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { merge, Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { faMicrophone, faMicrophoneSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as FFmpeg from 'ffmpeg.js';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import 'annyang'
import { Annyang } from 'annyang';
import { StereoAudioRecorder } from 'recordrtc';
import { compileDeclareClassMetadata } from '@angular/compiler';
import axios, { AxiosError } from 'axios';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { log } from 'console';

declare const annyang: Annyang;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  title = 'audio-record';

  error: any;
  options: any;
  private record: any;
  mediaRecorder!: MediaRecorder ;
  recordedChunks: Blob[] = [];
  // private ffmpeg = createFFmpeg({ log: true });
  recording = false;
  url: any;
  private readonly mimeType = 'audio/webm';


  totalTranscript?: string;

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();

  showSuccessMessage: boolean = false;
  userForm!: FormGroup;


  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faMessage = faEnvelope;
  faMicrophone = faMicrophone;
  faMicroSlash = faMicrophoneSlash;
  showPassword = false;


  constructor(public auth: AuthService,
    public fb: FormBuilder,
    private http: HttpClient,
    private ngZone: NgZone,
    public _recordRTC: RecordServiceService,
    private domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.usersForm();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  usersForm() {
    this.userForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      role: ['']   
     })
  }

  get first_name() {
    return this.userForm.get('firstname');
  }
  get last_name() {
    return this.userForm.get('lastname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get role() {
    return this.userForm.get('role');
  }


  responseMessage: string = '';
  isLoading = false;
  audioID !: number;

  randomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
} 

  uploadFile(event: any): void {
    this.isLoading = true;
    var id = this.randomString(12);
    handleAudioID.audioIDValue = id;
    
    let files = event.target.files[0];
    const formData = new FormData();
    formData.append('audio_file', files, files.name);
    this.http.post(`http://127.0.0.1:8000/process_wav/${id}`, formData).subscribe(
      (response: any) => {        
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  submitUserData() {
    var audioID = handleAudioID.audioValue;
  
    const { email, password, role, first_name, last_name } = this.userForm.value;
    this.auth.signUp(email, password, role, first_name, last_name, audioID)

      .then(() => {
        this.userForm.reset();
        this.showSuccessMessage = true;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  startVoiceRecord() {
    const URLs = this._recordRTC.toggleRecord();
  }

  //recording code
  // sanitize(url: string) {
  //   return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  // }

  // startRecording() {
  //   console.log('start');
  //   this.recording = true;
  //   navigator.mediaDevices.getUserMedia({ audio: true })
  //     .then(this.successCallback.bind(this))
  //     .catch(this.errorCallback.bind(this));
  // }

  // successCallback(stream: MediaStream) {
  //   this.mediaRecorder = new MediaRecorder(stream);

  //   this.mediaRecorder.ondataavailable = event => {
  //     if (event.data.size > 0) {
  //       this.recordedChunks.push(event.data);
  //     }
  //   };

  //   this.mediaRecorder.onstop = () => {
  //     this.processRecording(new Blob(this.recordedChunks, { type: 'audio/wav' }));
  //     console.log("type")
  //   };

  //   this.mediaRecorder.start();
  // }

  // stopRecording() {
  //   console.log('stop');
  //   this.recording = false;
  //   if (this.mediaRecorder) {
  //     this.mediaRecorder.stop();
  //   }
  // }

  // processRecording(audioBlob: Blob) {
  //   this.url = this.sanitize(window.URL.createObjectURL(audioBlob));
  //   this.recordedChunks = [];
  //   console.log(URL)
  // }

  // errorCallback(error: any) {
  //   console.error('Error accessing microphone:', error);
  // }
}

let handleAudioID = {
  audioIDValue: '',
  get audioValue() {
    return this.audioIDValue;
  }
}












