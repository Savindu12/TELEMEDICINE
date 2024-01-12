import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private localStorageKey = 'doctorId';

  private dataSubject = new Subject<any>();
  private apiUrl = 'http://localhost:4200/patient';
  // doctorIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  sendData(data: any) {
    this.http.post(this.apiUrl, data).subscribe((response: any) => {
      // Handle response if needed
    }, (error: any) => {
      console.error(error);
    });
  }

  // sendData(data: any) {
  //   this.dataSubject.next(data);
  // }

  getData() {
    return this.dataSubject.asObservable();
  }

  setDoctorId(id: string) {
    localStorage.setItem(this.localStorageKey, id);
  }
  setPatientId(id: string) {
    localStorage.setItem(this.localStorageKey, id);
  }

  setLoginId (id: string) {
    localStorage.setItem(this.localStorageKey, id);
  }

  getDoctorId(): string | null{
    const storedId = localStorage.getItem(this.localStorageKey);
    return storedId ? storedId.replace(/"/g, '') : null;
  }
  getPatientId(): string | null{
    const storedId = localStorage.getItem(this.localStorageKey);
    return storedId ? storedId.replace(/"/g, '') : null;
  }

  getLoginId(): string | null{
    const storedId = localStorage.getItem(this.localStorageKey);
    return storedId ? storedId.replace(/"/g, '') : null;
  }
}
