import { NetworkManager } from "./lib/NetworkManager";
import { IInterceptor } from "./types";
import { IHttpClient } from "./types";
import { HttpClient } from "./lib/HttpClient";

export { HttpClient };

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
