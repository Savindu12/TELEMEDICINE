import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseWalletComponent } from './PurchaseCoin/purchase-wallet/purchase-wallet.component';
import { DataService } from 'src/app/shared/data.service';
import { Data } from '@angular/router';
import { WalletService } from 'src/app/shared/wallet.service';
import { Wallet } from 'src/app/model/wallet';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

 wallet : Wallet[] =[];
  patientID!: string;
  patientWallet!: Observable<any>;

  constructor(
    public dialog: MatDialog,
    public dataService: DataService,
    public ws: WalletService,
    public router: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.router.queryParams.subscribe(params => {
      this.patientID = params['PatientId'];
    })

    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblVzZXIiOnsiZW1haWxWZXJpZmllZCI6ZmFsc2UsImlzQW5vbnltb3VzIjpmYWxzZSwiZ2VuZGVyIjoibWFsZSIsIm5hbWUiOiJUaGFyaW5kdSIsImlkIjoia3h4djFKMnNEVGFRQk0xR1BLVFNEcldQY2JNMiIsInVzZXJUeXBlIjoiUGF0aWVudCIsImVtYWlsIjoiZWVlZWVAZ21haWwuY29tIiwiYWdlIjo3fSwiaWF0IjoxNjk3NTIyMDgzfQ.LF2uv6hclIB56WwnIaIwLrhZQZTa3zSmCFdqc6h4W6o"

    this.ws.getMediCoin(jwtToken).subscribe(res => {
      console.log(res); 
    })

    this.patientWallet = this.dataService.getWalletDetailsByID(this.patientID)
    console.log(this.patientWallet);
  }

  PurchaseCoinPopup() {
    this.dialog.open(PurchaseWalletComponent)
  }

  deleteCoin() {
    this.dataService.deleteWalletDetailsByID(this.patientID);
  }
}
