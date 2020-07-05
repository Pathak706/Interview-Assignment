export interface Member {
    id?: number;
    full_name?: string;
    first_name: string;
    last_name?: string;
    email_id: string;
    mobile_no: string;
    dob: string;
    address: string;
}

export interface Response {
    status: boolean;
    data: Member[];
    message: string;
  }