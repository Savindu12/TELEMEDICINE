import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  constructor(private http: HttpClient) {}

  shareFile(file: File, receiveId: string, token: string) {
    const formData = new FormData();
    formData.append('filename', file);
    formData.append('receiveId', receiveId);
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });

    return this.http.post('http://localhost:3000/api/assets/upload', formData, {
      headers,
    });
  }

  getReceiveFile(token: any) {
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });

    return this.http.get(
      'http://localhost:3000/api/assets/getAssetsByReceiveId',
      {
        headers,
      }
    );
  }

  getSendFile(token: string) {
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });

    return this.http.get('http://localhost:3000/api/assets/getAssetsByUserId', {
      headers,
    });
  }

  downloadFile(token: any, assetId: string) {
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });

    return this.http.get(
      `http://localhost:3000/api/assets/download/${assetId}`,
      {
        headers,
      }
    );
  }
}
