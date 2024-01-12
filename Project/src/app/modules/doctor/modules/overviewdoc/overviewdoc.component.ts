import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdddoctorComponent } from '../adddoctor/adddoctor.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { doctor } from 'src/app/model/doctor';

@Component({
  selector: 'app-overviewdoc',
  templateUrl: './overviewdoc.component.html',
  styleUrls: ['./overviewdoc.component.scss']
})
export class OverviewdocComponent implements OnInit {

  doctorId!: string;
  doctors!:doctor[];
  value!: boolean;

  constructor (
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private DataService: DataService
  ) {}

  ngOnInit(){
    this.router.queryParams.subscribe(params => {
      this.doctorId = params['DoctorId'];
      sessionStorage.setItem('doctorid', this.doctorId);
    });
    this.doctorId = sessionStorage.getItem('doctorid') || '';
    this.DataService.getDoctorDataByID(this.doctorId).then((res) => {
      this.doctors = res
      this.doctors.forEach((specialist) => {
        if(specialist.address.length != 0){
          this.value = false
        }
        else {
          this.value = true
        }
      });
    })
  }

  // checkDoctoSpecialist () {
  //   if(this.doctors.specialist.length > 0) {
  //     this.value = true;
  //   }
  //   else {
  //     this.value = false;
  //   }
  // }

  openAddDoctorDialog () {
    this.dialog.open(AdddoctorComponent, {
      height: "40rem",
      width: "40rem"
    })
  }



}
