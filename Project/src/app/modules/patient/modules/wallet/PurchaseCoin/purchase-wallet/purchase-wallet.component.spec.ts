import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseWalletComponent } from './purchase-wallet.component';

describe('PurchaseWalletComponent', () => {
  let component: PurchaseWalletComponent;
  let fixture: ComponentFixture<PurchaseWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseWalletComponent]
    });
    fixture = TestBed.createComponent(PurchaseWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
