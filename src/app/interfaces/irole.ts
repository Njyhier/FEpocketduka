import { IPermission } from './ipermission';
export interface IRole {
  _id?: string;
  name: string;
  created_at?: Date;
  permissions?: IPermission[];
}
