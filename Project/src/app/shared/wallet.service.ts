import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) {}

  createMediCoin(token: string, value: number) {
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });
    return this.http.post(
      'http://localhost:3000/api/assets/coin',
      {
        value: value,
      },
      { headers }
    );
  }

  getMediCoin(token: string) {
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });
    return this.http.get(
      'http://localhost:3000/api/assets/coin/getAllMediCoinByOwner',
      { headers }
    );
  }

  transferMediCoin(token: string, coinId: string, newOwnerId: string) {
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });

    return this.http.patch(`http://localhost:3000/api/assets/coin/${coinId}`, {
      newOwner: newOwnerId,
    });
  }
}
