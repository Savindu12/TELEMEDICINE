export interface fileMetaData{
    id: string;
    name: string;
    size: number;
    file: File;
    url: string;
  }

  export class FileMetaData implements FileMetaData {
    id: string;
    name: string;
    size: number;
    file: File;
    url: string;
    constructor(file: File) {
      this.id = ''; 
      this.name = file.name;
      this.size = file.size;
      this.file = file;
      this.url = ''; 
    }
  }