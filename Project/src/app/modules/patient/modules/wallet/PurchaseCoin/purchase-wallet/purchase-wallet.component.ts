import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/Firestore';
import { BlockchainService } from 'src/app/shared/blockchain.service';
import { WalletService } from 'src/app/shared/wallet.service';

@Component({
  selector: 'app-purchase-wallet',
  templateUrl: './purchase-wallet.component.html',
  styleUrls: ['./purchase-wallet.component.css']
})
export class PurchaseWalletComponent implements OnInit {

  formControl!: FormGroup;
  patientId!: string;
  
  constructor(
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private bs: WalletService
  ){}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.patientId = params['PatientId'];
    })
    this.pruchaseForm();

  }

  pruchaseForm () {
    this.formControl = this.formBuilder.group({
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      date: new Date().toDateString()
    });
  }

  get price () {
    return this.formControl.get('price');
  }

  get quantity () {
    return this.formControl.get('quantity');
  }

  cancelBook(){
    this.dialog.closeAll()
  }

  generateKey() {
    return this.firestore.createId();
  }
  
  submitPurchaseDetails() {
    const coinID = this.generateKey();
    const {date, price, quantity } = this.formControl.value;
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblVzZXIiOnsiZW1haWxWZXJpZmllZCI6ZmFsc2UsImlzQW5vbnltb3VzIjpmYWxzZSwiZ2VuZGVyIjoibWFsZSIsIm5hbWUiOiJUaGFyaW5kdSIsImlkIjoia3h4djFKMnNEVGFRQk0xR1BLVFNEcldQY2JNMiIsInVzZXJUeXBlIjoiUGF0aWVudCIsImVtYWlsIjoiZWVlZWVAZ21haWwuY29tIiwiYWdlIjo3fSwiaWF0IjoxNjk3NTIyMDgzfQ.LF2uv6hclIB56WwnIaIwLrhZQZTa3zSmCFdqc6h4W6o"

    this.bs.createMediCoin(jwtToken, price).subscribe(res => {
      console.log(res);
    });

    this.dataService.purchaseWallet(coinID, date, price, quantity, this.patientId);
    this.formControl.reset();
  }
}
