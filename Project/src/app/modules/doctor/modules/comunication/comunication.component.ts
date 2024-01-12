import { Component, OnInit, ɵsetAlternateWeakRefImpl, ElementRef, ViewChild } from '@angular/core';
import Peer from 'peerjs';
import { DataService } from 'src/app/shared/data.service';
import { DoctorService } from 'src/app/shared/doctor.service';
import { ActivatedRoute, NavigationExtras, Router, UrlSegment, UrlTree } from '@angular/router';
import { first } from 'rxjs';
import { SupportpatComponent } from 'src/app/modules/patient/modules/supportpat/supportpat.component';
import { FormDataService } from 'src/app/shared/form-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPhone, faPhoneSlash,faBackward} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { PatientSelectComponent } from 'src/app/modules/patient/modules/patient-select/patient-select.component';

@Component({
  selector: 'app-comunication',
  templateUrl: './comunication.component.html',
  styleUrls: ['./comunication.component.css']
})
export class ComunicationComponent implements OnInit {

  phone = faPhone;
phoneSlash = faPhoneSlash;
back=faBackward;
  doctorId: string = '';
  dataToSend: any;
  patientId!: string;
  patientFirstname!: string;
  DoctorIDForm!: FormGroup;
  private peer:Peer; 
  peerIdShare!: string;
  peerId!: string;
private lazyStream:any;
currentPeer:any;
private peerList:Array<any>=[];
doctorID!: string;
meetingActive = false;

  constructor(
    private dialog: MatDialog,
    private formDataService: FormDataService,
    private crud: DataService,
    private router: ActivatedRoute,
    public fb: FormBuilder,
    private doctorService: DoctorService, private route: ActivatedRoute){
this.peer =new Peer();
  }
// navTosupportpat(){
//   this.router.navigate(['/supportpat'],{queryParms:{data:this. dataToSend}})
// }

@ViewChild('doctorIdInput') doctorIdInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.getPeerId();
    this.doctorForm();
    this.router.queryParams.subscribe(params => {
      this.doctorID = params['DoctorId'];
    })
  }

  doctorForm () {
    this.DoctorIDForm = this.fb.group ({
      DoctorId: ['']
    })
  }

  get DoctorId () {
    return this.DoctorIDForm.get('DoctorId');
  }



private getPeerId = () => {
  //Generate unique Peer Id for establishing connection
      this.peer.on('open', (id) => {
        this.peerId = id;
        
      });
  
  // Peer event to accept incoming calls
      this.peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then((stream) => {
          this.lazyStream = stream;
  
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            if (!this.peerList.includes(call.peer)) {
              this.streamRemoteVideo(remoteStream);
              this.currentPeer = call.peerConnection;
              this.peerList.push(call.peer);
            }
          });
  
        }).catch(err => {
          console.log(err + 'Unable to get media');
        });
      });
}

    connectWithPeer(): void{
      this.meetingActive = true;
      this.callPeer(this.peerIdShare);
    }


    
private callPeer(id: string): void {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then((stream) => {
    this.lazyStream = stream;

    const call = this.peer.call(id, stream);
    call.on('stream', (remoteStream) => {
      if (!this.peerList.includes(call.peer)) {
        this.streamRemoteVideo(remoteStream);
        this.currentPeer = call.peerConnection;
        this.peerList.push(call.peer);
      }
    });
  }).catch(err => {
    console.log(err + 'Unable to connect');
  });
}

private videoElement: HTMLVideoElement | null = null;

private streamRemoteVideo(stream: MediaStream): void {
  const video = document.createElement('video');
  video.classList.add('video');
  video.setAttribute('height','250px')
  video.setAttribute('padding-top', '80px')
  video.srcObject = stream;
  video.play();
  const remoteVideoElement = document.getElementById('video-id');
  remoteVideoElement?.appendChild(video);
  this.videoElement = video;
}

  sendPatientRequest(firstName:string) {
    const values = this.DoctorIDForm.value;
    const doctorId = this.doctorId;
    this.crud.storeDoctorID(this.doctorID,"",this.DoctorIDForm.value)
    
    // this.formDataService.setDoctorId(doctorId);
    console.log(doctorId);
    
    // const queryParams: NavigationExtras = {
    //   queryParams: {
    //     firstName: firstName,
    //     doctorId: JSON.stringify(values)
    //   }
    // };

    // this.router.navigate(['/patient'], queryParams);
    
    
    // this.doctorService.sendPatientRequest(values, firstName)
    //   .subscribe(
    //     () => {
    //       // Request sent successfully, handle any success logic or notifications
    //       console.log('Patient request sent');
    //     },
    //     (error) => {
    //       // Handle error response or show error message
    //       console.error('Failed to send patient request', error);
    //     }
    //   );
    // sendData() {
    //   this.formDataService.sendData(this.dataToSend);
    // }
  }
  stopCall(): void {
    if (this.lazyStream) {
      this.lazyStream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop(); // Stop the media tracks
      });
    }
  
    // Reset the peer and peer list
    this.peer.disconnect();
    this.peer.destroy();
    this.peerList = [];
    window.location.reload(); 
  }

  openPatient(meetingID: string){
    this.dialog.open(PatientSelectComponent, {
      data: {meetingID}
    })
  }
}
