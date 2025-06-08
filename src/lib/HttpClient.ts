import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  IAlgoResponse,
  IHttpClient,
  IInterceptor,
  NetworkConfig,
} from "../types";

export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;
  private interceptors: IInterceptor[] = [];

  constructor(config?: NetworkConfig) {
    this.axiosInstance = axios.create({
      baseURL: config?.baseURL || "",
      timeout: config?.timeout || 10000,
      headers: config?.headers || {},
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        let modifiedConfig = config;
        this.interceptors.forEach((interceptor) => {
          if (interceptor.onRequest) {
            modifiedConfig = interceptor.onRequest(modifiedConfig);
          }
        });
        return modifiedConfig;
      },
      (error) => {
        this.interceptors.forEach((interceptor) => {
          if (interceptor.onRequestError) {
            interceptor.onRequestError(error);
          }
        });
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        let modifiedResponse = response;
        this.interceptors.forEach((interceptor) => {
          if (interceptor.onResponse) {
            modifiedResponse = interceptor.onResponse(modifiedResponse);
          }
        });
        return modifiedResponse;
      },
      async (error) => {
        for (const interceptor of this.interceptors) {
          if (interceptor.onResponseError) {
            try {
              const result = await interceptor.onResponseError(error);
              if (result) return result;
            } catch (interceptorError) {
              return Promise.reject(interceptorError);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  addInterceptor(interceptor: IInterceptor): void {
    this.interceptors.push(interceptor);
  }

  removeInterceptor(interceptor: IInterceptor): void {
    const index = this.interceptors.indexOf(interceptor);
    if (index > -1) {
      this.interceptors.splice(index, 1);
    }
  }

  setBaseURL(url: string): void {
    this.axiosInstance.defaults.baseURL = url;
  }

  setTimeout(timeout: number): void {
    this.axiosInstance.defaults.timeout = timeout;
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IAlgoResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      url,
      config
    );
    return {
      data: response.data,
      status: response.status,
    };
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IAlgoResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config
    );
    return {
      data: response.data,
      status: response.status,
    };
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IAlgoResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config
    );
    return {
      data: response.data,
      status: response.status,
    };
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IAlgoResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      config
    );
    return {
      data: response.data,
      status: response.status,
    };
  }

  async request<T>(config: AxiosRequestConfig): Promise<IAlgoResponse<T>> {
    const response = await this.axiosInstance.request(config);
    return {
      data: response.data,
      status: response.status,
    };
  }
}
