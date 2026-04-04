export interface IApiresponse<T> {
  status?: number;
  message?: string;
  payload?: T;
}
