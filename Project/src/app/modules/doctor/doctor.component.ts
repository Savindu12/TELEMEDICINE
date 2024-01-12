import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  doctorId!: string;
  constructor( private router: ActivatedRoute,){}
  ngOnInit() {
    this.router.params.subscribe (params => {
      this.doctorId = params['DoctorId'];
        console.log("sadsa",params['DoctorId']);
    })
  }
  menuNumber: number = -1;

  changeMenu(menuID: number) {
    this.menuNumber = menuID;
  }
}
