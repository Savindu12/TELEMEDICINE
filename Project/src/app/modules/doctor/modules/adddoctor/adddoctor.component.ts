import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { doctor } from 'src/app/model/doctor';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.css']
})
export class AdddoctorComponent implements OnInit {
  formControl!: FormGroup;
  data: any;
  doctorId!: string;

  constructor(
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.doctorId = params['DoctorId'];
      sessionStorage.setItem('doctorid', this.doctorId);
    })
    this.doctorId = sessionStorage.getItem('doctorid') || '';
    this.doctorForm();
  }

  doctorForm () {
    this.formControl = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      mobileNo: ['', Validators.required],
      specialist: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  get first_name () {
    return this.formControl.get('first_name');
  }

  get last_name () {
    return this.formControl.get('last_name');
  }

  get age () {
    return this.formControl.get('age');
  }

  get address () {
    return this.formControl.get('address');
  }

  get mobileNo () {
    return this.formControl.get('mobileNo');
  }

  get email () {
    return this.formControl.get('email');
  }

  get specialist() {
    return this.formControl.get('specialist');
  }


  submitDoctorDetails() {
    this.dataService.adddoctor(this.doctorId, this.formControl.value);
    this.formControl.reset();
  }

  // submitUserData() {
  //   if (this.formControl.valid) {
  //     const first_name = this.formControl.get('first_name')?.value;
  //     const last_name = this.formControl.get('last_name')?.value;
  //     const age = this.formControl.get('age')?.value;
  //     const address = this.formControl.get('address')?.value;
  //     const mobileno = this.formControl.get('mobileno')?.value;
  //     const specialist=this.formControl.get('specialist')?.value;

  //     const  doctor:  doctor = {
  //       first_name, 
  //       last_name,
  //       id: '',
  //       age,
  //       address,
  //       mobileno,
  //       specialist,
        
  //     };

  //     this.dataService.adddoctor( doctor, this.doctorId)
  //       try {
         
  //         console.log('doctor added successfully.');
          
  //         this.formControl.reset();
  //         alert('Sussfull Adding')
  //       }
        
  //       catch (error:any) {
  //         console.error('Error Adding doctor:', error);
  //       }
  //   }
  // }


}