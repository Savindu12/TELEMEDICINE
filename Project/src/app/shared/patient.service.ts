import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../model/patient';
import { catchError } from 'rxjs/operators';
import{AngularFirestore,DocumentChangeAction,AngularFirestoreDocument} from'@angular/fire/compat/Firestore';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  getPatients() {
    throw new Error('Method not implemented.');
  }


  private apiUrl = 'http://localhost:4200/support';
  private ApiUrl = 'http://localhost:4200/document';

  constructor(private http: HttpClient,
              private afs: AngularFirestore) { }

  acceptPatientRequest(patientId: string, meetingDateTime: string) {
    const requestUrl = `${this.apiUrl}/patients/${patientId}/requests/accept`;
    return this.http.post(requestUrl, { meetingDateTime });
  }

  getPatient(patientId: string): Observable<any> {
    const url = `${this.ApiUrl}/patients/${patientId}`;
    
    return this.http.get(url)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching patient:', error);
          throw error;
        })
      );
  }

  
}
