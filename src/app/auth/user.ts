export interface User {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  mobilePhone: string;
  email: string;
  password: string;
  _id?:string;
  token: string | null;
}
