import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';

@Injectable({
  providedIn: 'root'
})
export class RecordServiceService {

  blobUrl: any;
  recording = false;
  interval: any; recordingTimer!: any; recordWebRTC: any; mediaRecordStream: any;
  options: any = {
    type: 'audio',
    mimeType: 'audio/webm',
    numberOfAudioChannels: 1,
    desiredSampRate: 24000,
  }
  
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  toggleRecord() {
    if (this.recordingTimer) {
      const URLs = this.stopRTC();
      this.recording = false;
      console.log("blob is the ",URLs);
      return URLs;
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.startRTC(stream);
        this.recording = true;
      }).catch(error => {
        alert(error)
      })
    }
  }

  startRTC(stream: any) {
    this.recordWebRTC = new RecordRTC.StereoAudioRecorder(stream,this.options);
    this.mediaRecordStream = stream;
    this.blobUrl = null;
    this.recordWebRTC.record();

    this.startCountdown();
  }

  stopRTC(){
    this.recordWebRTC.stop((blob: Blob | MediaSource) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      this.startCountdown(true);
      const blobs = new Blob([this.blobUrl], {type: 'audio/wav'});;
    })
  }

  startCountdown(clearTime = false) {
    if (clearTime) {
      this.clearStream(this.mediaRecordStream);
      this.recordWebRTC = null;
      this.recordingTimer = null;
      this.mediaRecordStream = null;
      clearInterval(this.interval);
      return
    } else {
      this.recordingTimer = `00:00`;
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      let timer: any = this.recordingTimer;
      timer = timer.split(':');
      let minutes = +timer[0];
      let seconds = +timer[1];

      if (minutes == 10) {
        this.recordWebRTC.stopRecording();
        clearInterval(this.interval);
        return
      }
      ++seconds;
      if (seconds >= 59) {
        ++minutes;
        seconds = 0;
      }

      if (seconds < 10) {
        this.recordingTimer = `0${minutes}:0${seconds}`;
      } else {
        this.recordingTimer = `0${minutes}:${seconds}`;
      }
    }, 1000);
  }

  clearStream(stream: any) {
    try {
      stream.getAudioTracks().forEach((track: any) => track.stop());
      stream.getVideoTracks().forEach((track: any) => track.stop());
    } catch (error) {
      //stream error
    }
  }
}
