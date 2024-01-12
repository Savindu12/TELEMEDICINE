import { Component, OnDestroy, OnInit, ɵsetAlternateWeakRefImpl } from '@angular/core';
import Peer from 'peerjs';
import { FormDataService } from '../../../../shared/form-data.service'; 
import { DoctorService } from 'src/app/shared/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faPhone, faPhoneSlash,faBackward} from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';
import { meetingDetails } from 'src/app/model/meetingDetails';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comunicationpat',
  templateUrl: './comunicationpat.component.html',
  styleUrls: ['./comunicationpat.component.css']
})
export class ComunicationpatComponent implements OnInit{

  private videoElement: HTMLVideoElement | null = null;
  private canvas!: HTMLCanvasElement;

  receivedData: any;
  private subscription: Subscription;
  dataToSend: any;
  meetingDetails!: any;
  patientId!: string;
  meetingDateTime!: string;

  private peer:Peer; 
  peerIdShare!: string;
  peerId!: string;
private lazyStream:any;
currentPeer:any;
private peerList:Array<any>=[];
firstName!: string;

phone = faPhone;
phoneSlash = faPhoneSlash;
back=faBackward;
meetingActive = false;

  constructor(
    private router: ActivatedRoute,
    public formDataService: FormDataService,
    private crud: DataService,
    private http: HttpClient,
    private doctorService: DoctorService){
this.peer =new Peer();

this.subscription = this.formDataService.getData().subscribe(data => {
  this.receivedData = data;
  // Perform any necessary actions with the received data
});

  }

  
  ngOnInit(): void {
    this.getPeerId();

    this.router.queryParams.subscribe(params => {
      this.patientId = params['PatientId'];
    });

    console.log(this.patientId);
    

    this.crud.getMeetingID(this.patientId).subscribe((res: any) => {
      console.log(res);

      this.meetingDetails = res;
    })
    
    
    // this.route.queryParams.subscribe(params => {
    //   this.firstName = params['firstName'];
    //   this.doctorId = JSON.parse(params['doctorId']);
    // });
  }

private getPeerId = () => {
      this.peer.on('open', (id: any) => {
        this.peerId = id;
      });
  
  // Peer event to accept incoming calls
      this.peer.on('call', (call: any) => {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then((stream) => {
          this.lazyStream = stream;
  
          call.answer(stream);
          call.on('stream', (remoteStream: any) => {
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


private streamRemoteVideo(stream: MediaStream): void {
  const video = document.createElement('video');
  video.setAttribute('height','100px')
  video.classList.add('video');
  video.setAttribute('padding-top', '40px')
  video.srcObject = stream;
  video.play();
  this.startScreenshotCapture();
  console.log(stream.getVideoTracks());
  const remoteVideoElement = document.getElementById('video-id');
  remoteVideoElement?.appendChild(video);
  this.videoElement = video;
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


playPauseVideo(value: number): void {
  switch(value){
    case 1: {
      this.videoElement?.pause();
      break;
    }
    case 2: {
      this.videoElement?.play();
      break;
    }
  }
}

private startScreenshotCapture(): void {
  this.canvas = document.createElement('canvas');
  const context = this.canvas.getContext('2d');
  const captureInterval = 5 * 1000; 
  setInterval(() => {
    if (this.videoElement && context) {
      this.canvas.width = this.videoElement.videoWidth;
      this.canvas.height = this.videoElement.videoHeight;
      context.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
      const screenshotDataUrl = this.canvas.toDataURL('image/jpg');
      // console.log('Captured screenshot:', screenshotDataUrl);
      // this.sendScreenshotToFastAPI(screenshotDataUrl)
      this.captureCanvasImage(this.canvas, (binaryData: any) => {
        this.sendBinaryCanvasImageToBackend(binaryData);
      });
    }
  }, captureInterval);
}

private sendScreenshotToFastAPI(dataUrl: string): void {
  console.log(dataUrl);
  const formData = new FormData();
  formData.append('image_upload', dataUrl);
  this.http.post('http://127.0.0.1:8000/faces_recognition', formData).subscribe(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.error(error);
    }
  );
}

sendBinaryCanvasImageToBackend(binaryData: ArrayBuffer) {
  const formData = new FormData();
  formData.append('image_upload', new Blob([binaryData]));
  this.http.post('http://127.0.0.1:8000/faces_recognition', formData).subscribe((response: any) => {
      const facesArray = response['faces'] as string[];
      if (facesArray && facesArray.length > 0) {
        console.log(facesArray[0]);
        
        if(facesArray[0] === "Lahiru") {
          this.playPauseVideo(2)
        }
        else {
          this.playPauseVideo(1)
        }
      } else {
        console.log("No faces found");
        this.playPauseVideo(1)
      }
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




}

