import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { doctor } from 'src/app/model/doctor';
import { Patient } from 'src/app/model/patient';
import { DataService } from 'src/app/shared/data.service';
import { DatadocService } from 'src/app/shared/datadoc.service'; 
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { BookDoctorComponent } from '../bookDoctorComponent/book-doctor/book-doctor.component';


@Component({
  selector: 'app-bookingact',
  templateUrl: './bookingact.component.html',
  styleUrls: ['./bookingact.component.scss']
})
export class BookingactComponent  implements OnInit{
  // userForm!: FormGroup;
  //  doctorLists : doctor[] =[];
  //  doctorObj : doctor = {
  //    id: '',
  //    first_name: '',
  //    last_name: '',
  //   specialist: '',

  // };
  //  id:string='';
  //  first_name:string ='';
  //  last_name:string ='';
  //  specialist:string ='';
  page: number = 1;
  count: number = 0;
  tableSize: number= 8;
  tableSizes : any = [5,10,15,20];

PatientId!:string;
  doctors: doctor[] = [];
  data: any;
  DataService: any;


  constructor(private DatadocService:DatadocService,
    private dialog: MatDialog,
    private router: ActivatedRoute){}

  ngOnInit(){
    this.DatadocService.getdoctors().subscribe((doctors: doctor[]) =>{
       this.doctors=doctors;
    });
    this.router.queryParams.subscribe (params => {
      this.PatientId = params['PatientId'];
    })
   }

openAddPatientDetails(patientID: string){
  this.dialog.open(AddpatientComponent, {
    data: {patientID},
    height: '510px', 
  })
}

  BookDoctorPopup(firstName: string, doctorId: string){
    this.dialog.open(BookDoctorComponent, {
      data: {
        doctorName: firstName,
        patientID: this.PatientId,
        doctorID: doctorId,
      }
    })
  }


   onTableDataChange(event:any){
    this.page =event;
    this. getdoctors();
  }
  getdoctors() {
    throw new Error('Method not implemented.');
  }

  onTableSizeChange(event: any):void{
    this.tableSize =event.target.value;
    this.page = 1;
    this. getdoctors();
  }
  //  submitbookingData () {
  //   const {first_name,last_name,specialist } = this.userForm.value;


  //  bookingdoctor(patient : Patient){
  //   if(window.confirm('Are you sure you want to booking'+'?')){
  //     this.data.booking.patient(patient);
  // //    }

  // loadPatientData() {
  //   const patientDetails = {
  //     name: [],
  //     age: [],
  //   };
  
  //   // Load patient data from a source (e.g., Firebase)
  //   // Assuming you have a DataService that retrieves the patient data
  //   this.DataService.getPatientData().subscribe((data: any) => {
  //     // Extract the patient details from the retrieved data
  //     patientDetails.name = data.name;
  //     patientDetails.age = data.age;
  
  //     // Store the patient details in the shared service
  //     this.DataService.setPatientDetails(patientDetails);
  //   });
  // }


  // getAlldoctors(){
  //   this.data.getAlldoctors().subscribe( 
  //     (res: any[])  => {
  //     this.doctorLists = res.map((e:any) => {
  //       const data =e.payload.doc.data();
  //       data.id = e.payload.doc.id;
  //       return data;
  //     })

  //   }, (err: any)=> {
  //     console.error('Error while fetching patient data:', err);
  //     alert('Error while fetching patient data');

  //   })
  // }

  //  adddoctor(){
  //   if(this.id==''|| this.first_name == '' || this.last_name == '' ||  this.specialist ==''){
  //  alert('Fill all input field');
  //   return;

  // }

  // this.doctorObj.id = '';
  // this.doctorObj.first_name= this.first_name;
  // this.doctorObj.last_name = this.last_name;
  // this.doctorObj.specialist = this.specialist;

  //   this.data.addpatient.Booking(this.doctorObj);
 
  //  }
   
  // UpdatePatient(){


  // }

  // deletePatient(patient : Patient){
  //   if(window.confirm('Are you sure you want to delete'+patient.first_name+' '+patient.last_name+' '+'?')){
  //   this.data.deletePatient(patient);
  //   }
  // }
   

}

