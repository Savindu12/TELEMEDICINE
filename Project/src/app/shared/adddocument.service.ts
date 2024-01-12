import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdddocumentService {
  private documents: { name: string; url: string }[] = [];
  constructor() { }
  addDocument(name: string, url: string) {
    const newDocument = { name, url };
    this.documents.push(newDocument);
    console.log(`Document added: ${name}`);
  }

  getDocuments() {
    return this.documents;
  }
  
}
