import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-navpat',
  templateUrl: './navpat.component.html',
  styleUrls: ['./navpat.component.css']
})
export class NavpatComponent implements OnInit {

  patient: Patient[] = [];
  first_name:string ='';
    last_name:string ='';
    dataservice: Patient[] = []; 
  email !: string;
PatientId!:string;
  constructor(
    private router:ActivatedRoute,
    private authService: AuthService
  ){

  }

  Search(){
    if(this.first_name,this.last_name == ""){
      this.ngOnInit();
    }else{
      this.dataservice = this.dataservice.filter((res: {first_name: string ,last_name: string;}) => {
        
        return res.last_name.toLocaleLowerCase().match(this.last_name.toLocaleLowerCase());
      });
    }

}

ngOnInit(): void {
  this.dataservice = this.patient;
  this.router.queryParams.subscribe(params => {
    this.email = params['email'];
  });
  this.dataservice = this.patient;
  this.router.queryParams.subscribe(params => {
    this.PatientId = params['PatientId'];
  });
}

onSignOut() {
  this.authService.signOutPatient();
}
}
