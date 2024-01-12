import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { accpetedPatients } from 'src/app/model/acceptedPatients';
import { book } from 'src/app/model/book';
import { Patient } from 'src/app/model/patient';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-patient-select',
  templateUrl: './patient-select.component.html',
  styleUrls: ['./patient-select.component.css']
})
export class PatientSelectComponent  implements OnInit{

  patients!: book[];
  patientList!: accpetedPatients[];
  doctorID!: string;
  patientsList!: Patient[];

  constructor(
    private router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {meetingID: string},
    private crud: DataService,
    public dialog: MatDialog,  ){}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.doctorID = params['DoctorId'];
    })
          this.crud.getAcceptedPatientDataByID(this.doctorID).then(res => {
            for(let details of res) {
              this.crud.getPatientDataByID(details.acceptedpatientID).then((res: any)=> {
                this.patientsList = res;
              })
            }
          })
  }

  submitPatientID(patientID: string) {
    this.crud.storeDoctorID(this.doctorID,patientID, this.data.meetingID);
    this.dialog.closeAll();
  }
}
