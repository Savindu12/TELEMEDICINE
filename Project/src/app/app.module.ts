import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import {SigninSelectorComponent } from './modules/signin-selector/signin-selector.component';
import { PatientComponent } from './modules/patient/patient.component';
import { DoctorComponent } from './modules/doctor/doctor.component';
import { BookingactComponent } from './modules/patient/modules/bookingact/bookingact.component';
import { PrescriptionComponent } from './modules/patient/modules/prescription/prescription.component';
import { SettingComponent } from './modules/patient/modules/setting/setting.component';
import { WalletComponent } from './modules/patient/modules/wallet/wallet.component';
import { InboxComponent } from './modules/patient/modules/inbox/inbox.component';
import { NotificationComponent } from './modules/patient/modules/notification/notification.component';
import { SupportComponent } from './modules/doctor/modules/support/support.component';
import { PatientlitComponent } from './modules/doctor/modules/patientlit/patientlit.component';
import { ServicesComponent } from './services/services.component';
import { NavComponent } from './modules/doctor/modules/nav/nav.component';
import { OverviewdocComponent } from './modules/doctor/modules/overviewdoc/overviewdoc.component';
import { OverviewpatComponent } from './modules/patient/modules/overviewpat/overviewpat.component';
import { BookingactdoComponent } from './modules/doctor/modules/bookingactdo/bookingactdo.component';
import { InboxdoComponent } from './modules/doctor/modules/inboxdo/inboxdo.component';
import { NotificationdoComponent } from './modules/doctor/modules/notificationdo/notificationdo.component';
import { SignupComponent } from './modules/signup/signup.component';
//import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
//import { provideAuth,getAuth } from '@angular/fire/auth';
//import { provideFirestore,getFirestore } from '@angular/fire/firestore';
//import { provideStorage,getStorage } from '@angular/fire/storage';
//import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './modules/doctor/modules/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { AddpatientComponent } from './modules/patient/modules/bookingact/addpatient/addpatient.component';
import { SupportpatComponent } from './modules/patient/modules/supportpat/supportpat.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SigninpatComponent } from './modules/patient/modules/signinpat/signinpat.component';
import { NavpatComponent } from './modules/patient/modules/navpat/navpat.component';
import { ComunicationComponent } from './modules/doctor/modules/comunication/comunication.component';
import { ComunicationpatComponent } from './modules/patient/modules/comunicationpat/comunicationpat.component';
import { DocumentdocComponent } from './modules/doctor/modules/documentdoc/documentdoc.component';
import { DocumentpatComponent } from './modules/patient/modules/documentpat/documentpat.component';
import { FilesharepatComponent } from './modules/patient/modules/filesharepat/filesharepat.component';
import { FilesharedocComponent } from './modules/doctor/modules/filesharedoc/filesharedoc.component';
import { AdddoctorComponent } from './modules/doctor/modules/adddoctor/adddoctor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { ViewDocumentsComponent } from './modules/patient/view-documents/view-documents.component';
import { BookDoctorComponent } from './modules/patient/modules/bookDoctorComponent/book-doctor/book-doctor.component';
import { DatePipe } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { PatientSelectComponent } from './modules/patient/modules/patient-select/patient-select.component';
import { ViewDocumentPatientComponent } from './modules/patient/modules/view-document-patient/view-document-patient.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PurchaseWalletComponent } from './modules/patient/modules/wallet/PurchaseCoin/purchase-wallet/purchase-wallet.component';
import { ViewDoctorDocComponent } from './modules/doctor/modules/viewDoctorDoc/view-doctor-doc/view-doctor-doc.component';
import { DoctorDOcComponent } from './modules/doctor/modules/viewDoctorDoc/DoctorDoc/doctor-doc/doctor-doc.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SigninSelectorComponent,
    PatientComponent,
    DoctorComponent,
    PrescriptionComponent,
    SettingComponent,
    WalletComponent,
    InboxComponent,
    NotificationComponent,
    SupportComponent,
    PatientlitComponent,
    ServicesComponent,
    NavComponent,
    OverviewdocComponent,
    OverviewpatComponent,
    BookingactdoComponent,
    InboxdoComponent,
    NotificationdoComponent,
    SignupComponent,
    BookingactComponent,
    SigninComponent,
    AddpatientComponent,
    SupportpatComponent,
    SigninpatComponent,
    NavpatComponent,
    ComunicationComponent,
    ComunicationpatComponent,
    DocumentdocComponent,
    DocumentpatComponent,
    FilesharepatComponent,
    FilesharedocComponent,
    AdddoctorComponent,
    ForgotPasswordComponent,
    LoginHeaderComponent,
    ViewDocumentsComponent,
    BookDoctorComponent,
    PatientSelectComponent,
    ViewDocumentPatientComponent,
    PurchaseWalletComponent,
    ViewDoctorDocComponent,
    DoctorDOcComponent
  ],
  imports: [
    BrowserModule,
   FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    NgxDocViewerModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HotToastModule.forRoot(),
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    ClipboardModule,
  ],

  providers:[DatePipe],
  bootstrap: [AppComponent]

})
export class AppModule { }
