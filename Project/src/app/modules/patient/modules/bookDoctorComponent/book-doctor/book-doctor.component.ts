import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { log } from 'console';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/model/wallet';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-doctor',
  templateUrl: './book-doctor.component.html',
  styleUrls: ['./book-doctor.component.css']
})
export class BookDoctorComponent implements OnInit {

  doctorName!: string
  currentDateTime!: Date
  today = new Date().toDateString()
  time = new Date().toLocaleTimeString()
  recievedRow: any;
  wallet : Wallet[] =[];
  patientWallet!: Observable<any>;
  patientID!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialog: MatDialog,
    private dataService: DataService,
    private router: ActivatedRoute
  ){
    this.recievedRow = data
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.patientID = params['PatientId'];
    })

    this.patientWallet = this.dataService.getWalletDetailsByID(this.patientID)
  }

  bookDoctor(doctorID: string, patientID: string, coinID: string) {
    this.dataService.acceptPatientBooking(patientID, doctorID, coinID, this.today, this.time);
    this.dataService.acceptPatientBookingView(patientID, doctorID, coinID, this.today, this.time);
    this.dialog.closeAll()
  }


  cancelBook(){
    this.dialog.closeAll()
  }

}
