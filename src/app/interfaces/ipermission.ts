export interface IPermission {
  _id?: string;
  name: string;
  action?: string;
  target?: string;
  created_at?: Date;
}
