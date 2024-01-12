import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddpatientComponent } from '../bookingact/addpatient/addpatient.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { doctor } from 'src/app/model/doctor';
import { Patient } from 'src/app/model/patient';

@Component({
  selector: 'app-overviewpat',
  templateUrl: './overviewpat.component.html',
  styleUrls: ['./overviewpat.component.scss']
})
export class OverviewpatComponent implements OnInit {

  patientId!: string;
  patients!: Patient[];
  value!: boolean;

  constructor (
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private DataService: DataService
  ) {}

  ngOnInit(){
    this.router.queryParams.subscribe(params => {
      this.patientId = params['PatientId'];
      sessionStorage.setItem('patientid', this.patientId);
    });
    this.patientId = sessionStorage.getItem('patientid') || '';
    this.DataService.getPatientDataByID(this.patientId).then((res) => {
      this.patients = res
      this.patients.forEach((specialist) => {
        if(specialist.address.length != 0){
          this.value = false
        }
        else {
          this.value = true
        }
      });
    })
  }

  openAddPatientDialog () {
    this.dialog.open(AddpatientComponent, {
      height: '510px', 
    })
  }
}
