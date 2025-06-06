import { IHttpClient, IInterceptor, HttpClientMethods } from "../types";

import { INetworkManager } from "../types";

export class NetworkManager implements INetworkManager {
  constructor(private httpClient: IHttpClient) {}

  addInterceptor(interceptor: IInterceptor): void {
    if (HttpClientMethods.ADD_INTERCEPTOR in this.httpClient) {
      (this.httpClient as any).addInterceptor(interceptor);
    }
  }

  removeInterceptor(interceptor: IInterceptor): void {
    if (HttpClientMethods.REMOVE_INTERCEPTOR in this.httpClient) {
      (this.httpClient as any).removeInterceptor(interceptor);
    }
  }

  setBaseURL(url: string): void {
    if (HttpClientMethods.SET_BASE_URL in this.httpClient) {
      (this.httpClient as any).setBaseURL(url);
    }
  }

  setTimeout(timeout: number): void {
    if (HttpClientMethods.SET_TIMEOUT in this.httpClient) {
      (this.httpClient as any).setTimeout(timeout);
    }
  }

  async get<T>(url: string, config?: any): Promise<T> {
    return this.httpClient.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.httpClient.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.httpClient.put<T>(url, data, config);
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    return this.httpClient.delete<T>(url, config);
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.httpClient.patch<T>(url, data, config);
  }

  async request<T>(config: any): Promise<T> {
    return this.httpClient.request<T>(config);
  }
}
