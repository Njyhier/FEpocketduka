import { IAddress } from './iaddress';
export interface IUser {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  username: string;
  created_at?: string;
  updated_at?: string;
  role_names?: string[];
  addresses?: IAddress[];
}

export interface IUserCreate {
  username: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

export interface IUserRoleUpdate {
  role_names: string[];
}

export interface IUserListParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface IPaginatedResponse<T> {
  items: T[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}
