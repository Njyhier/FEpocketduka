import { IRole } from './irole';
import { IAddress } from './iaddress';
export interface IUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  username: string;
  created_at?: Date;
  updated_at?: Date;
  roles?: IRole[];
  addresses?: IAddress[];
}
