import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/model/patient';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit{

  formControl!: FormGroup;
  data: any;
  patientId!:string
  constructor(
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.patientId = params['PatientId'];
      console.log(this.patientId);
      
      sessionStorage.setItem('patientid', this.patientId);
    })
    this.patientId = sessionStorage.getItem('patientid') || '';
    this.patientsForm();
  }

  patientsForm () {
    this.formControl = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      mobileno: ['', Validators.required],
      email:['']
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

  get mobileno () {
    return this.formControl.get('mobileno');
  }

  get email () {
    return this.formControl.get('email');
  }

  submitPatientData () {
    this.dataService.addPatient(this.patientId, this.formControl.value)
    this.formControl.reset();
  }

  // submitUserData() {
  //   if (this.formControl.valid) {
  //     const first_name = this.formControl.get('first_name')?.value;
  //     const last_name = this.formControl.get('last_name')?.value;
  //     const age = this.formControl.get('age')?.value;
  //     const address = this.formControl.get('address')?.value;
  //     const mobileno = this.formControl.get('mobileno')?.value;
  //     const document = this.formControl.get('document')?.value;
  //     const email = this.formControl.get('Email')?.value;
      
  //     const  patient:  Patient = {
  //       first_name,
  //       last_name,
  //       id: '',
  //       age,
  //       address,
  //       mobileno,
  //       email: ''
  //     };

  //     this.dataService.addPatient( patient, this.patientId)
  //       try {
         
  //         console.log('patient Booked successfully.');
          
  //         this.formControl.reset();
  //         alert('Sussfull Booking')
  //       }
        
  //       catch (error:any) {
  //         console.error('Error Booking patient:', error);
  //       }
  //   }
    
  // }


  deletePatient(patient : Patient){
       if(window.confirm('Are you sure you want to delete'+patient.first_name+' '+patient.last_name+' '+patient.age+' '+patient.address+patient.mobileno+' '+' '+'?')){
       this.data.deletePatient(patient);
       }


}
}
