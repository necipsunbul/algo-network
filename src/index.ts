import { NetworkManager } from "./lib/NetworkManager";
import { IInterceptor, IHttpClient } from "./types";
import { HttpClient } from "./lib/HttpClient";

export * from "./types";

export { HttpClient };
export { NetworkManager };

export default function createAlgoInstance(
  httpClient: IHttpClient,
  interceptors?: IInterceptor[]
) {
  const networkManager = new NetworkManager(httpClient);

  if (interceptors) {
    interceptors.forEach((interceptor) => {
      networkManager.addInterceptor(interceptor);
    });
  }

  return networkManager;
}
