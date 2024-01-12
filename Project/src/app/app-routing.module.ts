import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {SigninSelectorComponent} from "./modules/signin-selector/signin-selector.component";
import {PatientComponent} from "./modules/patient/patient.component";
import {DoctorComponent} from "./modules/doctor/doctor.component";
import { BookingactComponent } from './modules/patient/modules/bookingact/bookingact.component';
import { NotificationComponent } from './modules/patient/modules/notification/notification.component';
import { PrescriptionComponent} from './modules/patient/modules/prescription/prescription.component';
import { SettingComponent } from './modules/patient/modules/setting/setting.component';
import { WalletComponent  } from './modules/patient/modules/wallet/wallet.component';
import { SupportComponent } from './modules/doctor/modules/support/support.component';
import { InboxComponent } from './modules/patient/modules/inbox/inbox.component';
import { PatientlitComponent } from './modules/doctor/modules/patientlit/patientlit.component';
import { NavComponent } from './modules/doctor/modules/nav/nav.component';
import { ServicesComponent } from './services/services.component';
import { OverviewdocComponent } from './modules/doctor/modules/overviewdoc/overviewdoc.component';
import { OverviewpatComponent } from './modules/patient/modules/overviewpat/overviewpat.component';
import { BookingactdoComponent } from './modules/doctor/modules/bookingactdo/bookingactdo.component';
import { InboxdoComponent } from './modules/doctor/modules/inboxdo/inboxdo.component';
import { NotificationdoComponent } from './modules/doctor/modules/notificationdo/notificationdo.component';
import { SignupComponent } from './modules/signup/signup.component';
import { SigninComponent } from './modules/doctor/modules/signin/signin.component';
import { AddpatientComponent } from './modules/patient/modules/bookingact/addpatient/addpatient.component';
import { SigninpatComponent } from './modules/patient/modules/signinpat/signinpat.component';
import { FooterComponent } from './footer/footer.component';
import { ComunicationComponent } from './modules/doctor/modules/comunication/comunication.component';
import { ComunicationpatComponent } from './modules/patient/modules/comunicationpat/comunicationpat.component';
import { DocumentpatComponent } from './modules/patient/modules/documentpat/documentpat.component';
import { DocumentdocComponent } from './modules/doctor/modules/documentdoc/documentdoc.component';
import { FilesharepatComponent } from './modules/patient/modules/filesharepat/filesharepat.component';
import { FilesharedocComponent } from './modules/doctor/modules/filesharedoc/filesharedoc.component';
import { AdddoctorComponent } from './modules/doctor/modules/adddoctor/adddoctor.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ViewDocumentPatientComponent } from './modules/patient/modules/view-document-patient/view-document-patient.component';



const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'signin',component:SigninComponent},
  {path:'signinpatient', component: SigninpatComponent},
  {path:'signin-selector',component:SigninSelectorComponent},
  {path:'patient',component:PatientComponent },
  {path:'doctor',component:DoctorComponent},
  {path:'bookingact',component:BookingactComponent},
  {path:'notification',component:NotificationComponent },
  {path:'prescription',component:PrescriptionComponent},
  {path:'setting',component:SettingComponent},
  {path:'support/:FirstName',component:SupportComponent},
  {path:'wallet',component:WalletComponent },
  {path:'inbox',component:InboxComponent },
  {path:'patientlit',component:PatientlitComponent},
  {path:'nav',component:NavComponent},
  {path:'services',component:ServicesComponent},
  {path:'overviewdoc',component:OverviewdocComponent},
  {path:'overviewpat',component:OverviewpatComponent},
  {path:'bookingactdo',component:BookingactdoComponent},
  {path:'inboxdo',component:InboxdoComponent},
  {path:'notificationdo',component:NotificationdoComponent},
  {path:'signup',component:SignupComponent},
  {path:'addpatient/:PatientId',component:AddpatientComponent},
  {path:'footer',component:FooterComponent},
  {path:'navpat',component:NavComponent},
  {path:'comunication',component:ComunicationComponent},
  {path:'comunicationpat',component:ComunicationpatComponent},
  {path:'documentpat',component:DocumentpatComponent},
  {path:'documentdoc',component:DocumentdocComponent},
  {path:'filesharepat',component:FilesharepatComponent},
  {path:'filesharedoc',component:FilesharedocComponent},
  {path:'adddoctor/:DoctorId',component:AdddoctorComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'patient/view-document', component:ViewDocumentPatientComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
