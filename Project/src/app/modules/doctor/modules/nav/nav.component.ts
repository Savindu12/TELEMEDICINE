import { Component } from '@angular/core';
import { doctor } from '../../../../model/doctor';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  doctors: doctor[] = [];
  DoctorId!: string;
  first_name:string ='';
    last_name:string ='';
    dataservice: doctor[] = []; 
email!:string
  constructor (
    private router: ActivatedRoute,
    private authService: AuthService
  ) {

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
  this.dataservice = this.doctors;
  this.router.queryParams.subscribe (params => {
    this.DoctorId = params['DoctorId'];
  })
}

onSignOut() {
  this.authService.signOutDoctor();
}
}
