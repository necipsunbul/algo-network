export interface IHttpClient {
  get<T>(url: string, config?: any): Promise<IAlgoResponse<T>>;
  post<T>(url: string, data?: any, config?: any): Promise<IAlgoResponse<T>>;
  put<T>(url: string, data?: any, config?: any): Promise<IAlgoResponse<T>>;
  delete<T>(url: string, config?: any): Promise<IAlgoResponse<T>>;
  patch<T>(url: string, data?: any, config?: any): Promise<IAlgoResponse<T>>;
  request<T>(config: any): Promise<IAlgoResponse<T>>;
}

export enum HttpClientMethods {
  ADD_INTERCEPTOR = "addInterceptor",
  REMOVE_INTERCEPTOR = "removeInterceptor",
  SET_BASE_URL = "setBaseURL",
  SET_TIMEOUT = "setTimeout",
}

export interface IInterceptor {
  onRequest?(config: any): any;
  onRequestError?(error: any): any;
  onResponse?(response: any): any;
  onResponseError?(error: any): any;
}

export interface INetworkManager extends IHttpClient {
  addInterceptor(interceptor: IInterceptor): void;
  removeInterceptor(interceptor: IInterceptor): void;
  setBaseURL(url: string): void;
  setTimeout(timeout: number): void;
}

export interface NetworkConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  validateStatus?: (status: number) => boolean;
}

export interface IAlgoResponse<T> {
  data: T;
  status: number;
}
