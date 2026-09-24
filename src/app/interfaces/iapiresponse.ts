export interface IApiresponse<T> {
  status?: number;
  message?: string;
  payload?: T;
}

export interface IApiResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
  page: number;
  total_pages: number;
}
