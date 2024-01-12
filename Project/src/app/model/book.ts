
export interface book {
    bookDoctorID :string,
    patientID: string,
    coinID: string,
    date: string,
    time: string,
    documents: document[]
}

export interface document {
    name: string,
    url: string
}