import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
 private apiUrl =' http://localhost:4200/patient';

  constructor(private http: HttpClient) { }

  sendPatientRequest(doctorId: string, FirstName: string) {
    const requestUrl = `${this.apiUrl}/doctors/${doctorId}/requests`;
    return this.http.put(requestUrl,null); 
  }

  acceptPatientRequest(doctorId: string ) {
    const requestUrl = `${this.apiUrl}/doctors/${doctorId}/requests/accept`;
    return this.http.post(requestUrl, null);
  }

}
