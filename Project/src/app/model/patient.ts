export interface Patient {
    id: string,
    first_name :string,
    last_name: string,
    age : string,
    address:string,
    mobileno:string,
    email:string,
    documents: document
}

export interface document {
    name: string,
    url: string
}

 