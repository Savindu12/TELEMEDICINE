
export interface accpetedPatients {
    DoctorID :string,
    acceptedpatientID: string,
    date: string,
    time: string,
    documents: document
}

export interface document {
    name: string,
    url: string
}