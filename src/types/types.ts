export interface CreateClientRequestBody {
   username: string;
   email: string;
   password: string;
   first_name: string;
   last_name: string;
   date_of_birth: string;
   address?: string;
   phone_number?: string;
   gender?: string;
   nationality?: string;
   
 };
 
 export interface CreateUserRequestBody {
  username: string;
  name: string;
  surname: string;
  password_hash: string;
  email: string;   
}

export interface CreateArtistRequestBody {
   username: string;
   email: string;
   password: string;
   first_name: string;
   phone_number: string;
   tattoo_style: string;
   user_id:number;
 };

 export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export interface TokenData {
  userId: string;
  userRoles: string[];
}

export interface CreateAppointmentsRequestBody {
 user_id: number,
 artist_id:number,
 date: Date;
 hour: string
}

