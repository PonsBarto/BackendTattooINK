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

export interface CreateArtistRequestBody {
   username: string;
   email: string;
   password: string;
   first_name: string;
   phone_number: string;
   tattoo_style: string;
   user_id:number;
 };