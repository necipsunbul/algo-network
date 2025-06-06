export interface IHttpClient {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
  patch<T>(url: string, data?: any, config?: any): Promise<T>;
  request<T>(config: any): Promise<T>;
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
}
