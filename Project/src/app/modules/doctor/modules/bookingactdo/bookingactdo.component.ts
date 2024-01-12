import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { log } from 'console';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bookingactdo',
  templateUrl: './bookingactdo.component.html',
  styleUrls: ['./bookingactdo.component.scss']
})

export class BookingactdoComponent  implements OnInit{

  doctorName!: string
  currentDateTime!: Date
  today = new Date().toDateString()
  time = new Date().toLocaleTimeString()
  recievedRow: any;
  doctorID!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public router: ActivatedRoute,
    public dialog: MatDialog,
    private dataService: DataService,
  ) {
    this.recievedRow = data
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.doctorID = params['DoctorId'];
      console.log(this.doctorID);
      
    })
  }
  
  acceptPatient(patientID: string) { 
    const Value = this.dataService.acceptPatient(patientID, this.doctorID, this.today, this.time);
    this.dataService.deletepatientBook(patientID);
    this.dialog.closeAll()
  }



  cancelBook(){
    this.dialog.closeAll()
  }
 
}
