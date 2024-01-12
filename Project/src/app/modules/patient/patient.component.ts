import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent  {


  menuNumber: number = -1;

  changeMenu(menuID: number) {
    this.menuNumber = menuID;
  }

  setNumber(menuID: number){
    this.menuNumber = menuID;
  }
 
  
//   Search(){
//     if(this.title,this.description == ""){
//       this.ngOnInit();
//     }else{
//       this.trending = this.trending.filter((res: { title: string ,description: string;}) => {
        
//         return res.description.toLocaleLowerCase().match(this.description.toLocaleLowerCase());
//       });
//     }

// }
}
