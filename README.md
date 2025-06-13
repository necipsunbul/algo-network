# Algo Network Manager

[![GitHub Repository](https://img.shields.io/badge/GitHub-algo--network-blue?logo=github)](https://github.com/necipsunbul/algo-network)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?logo=typescript)](https://github.com/necipsunbul/algo-network)
[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](https://github.com/necipsunbul/algo-network/blob/master/LICENSE)

A modern and flexible TypeScript library for HTTP client management. Simplifies request/response handling with interceptor support.

## Installation

```bash
npm install algo-network-manager
```

## Basic Usage

```typescriptnpm
import createAlgoInstance, { HttpClient } from "algo-network-manager";

const client = createAlgoInstance(
  new HttpClient({
    baseURL: "http://google.com.tr",
  })
);

client.get("/").then((payload) => console.log(payload));
```

## Key Features

- 🚀 TypeScript support
- 🔧 Interceptor system
- 🌐 Flexible HTTP client configuration
- 📦 Reliable network operations based on Axios
- 🔌 Easy integration

## API Usage

### createAlgoInstance(httpClient, interceptors?)

The main function `createAlgoInstance` is used to create and return a NetworkManager instance.

**Parameters:**

- `httpClient`: Client that implements the IHttpClient interface (HttpClient)
- `interceptors`: (Optional) Array of IInterceptor

**Return Value:**
NetworkManager instance with the following methods:

- `get(url, config?)`
- `post(url, data?, config?)`
- `put(url, data?, config?)`
- `delete(url, config?)`
- `patch(url, data?, config?)`

## Interceptor Usage

Interceptors are used to intercept request and response operations.

### Example Auth Interceptor

```typescript
import { type IInterceptor } from "algo-network-manager";

export class AuthInterceptor implements IInterceptor {
  constructor() {}

  onRequest(config: any): any {
    const token = localStorage.getItem("your_token_title");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  }

  onRequestError(error: any): any {
    return Promise.reject(error);
  }
}
```

### Creating Client with Interceptor

```typescript
import createAlgoInstance, { HttpClient } from "algo-network-manager";

const authInterceptor = new AuthInterceptor(authService);

const client = createAlgoInstance(
  new HttpClient({
    baseURL: "https://api.example.com",
    timeout: 10000,
  }),
  [authInterceptor]
);

// Usage
client.get("/users").then((response) => {
  console.log(response);
});

client
  .post("/users", {
    name: "John Doe",
    email: "john@example.com",
  })
  .then((response) => {
    console.log("User created:", response);
  });
```

## HttpClient Configuration

```typescript
const httpClient = new HttpClient({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status: number) => status >= 200 && status < 300,
});
```

### Configuration Options

- `baseURL`: Base URL for all requests
- `timeout`: Request timeout in milliseconds (default: 10000)
- `headers`: Default headers to be sent with every request
- `validateStatus`: Function to determine if HTTP status code should be considered successful

  - **Type**: `(status: number) => boolean`
  - **Default**: `undefined` (uses Axios default: 200-299 range)
  - **Example**:

    ```typescript
    // Accept only 200 status as successful
    validateStatus: (status) => status === 200;

    // Accept 200-399 range as successful
    validateStatus: (status) => status >= 200 && status < 400;
    ```

## Advanced Usage

### Multiple Interceptors

```typescript
const loggingInterceptor = new LoggingInterceptor();
const authInterceptor = new AuthInterceptor(authService);
const errorHandlerInterceptor = new ErrorHandlerInterceptor();

const client = createAlgoInstance(
  new HttpClient({ baseURL: "https://api.example.com" }),
  [loggingInterceptor, authInterceptor, errorHandlerInterceptor]
);
```

### Error Handling

```typescript
client
  .get("/api/data")
  .then((response) => {
    console.log("Success:", response);
  })
  .catch((error) => {
    console.error("Request failed:", error);
  });
```

## Interfaces

### IInterceptor

```typescript
interface IInterceptor {
  onRequest?(config: any): any;
  onRequestError?(error: any): any;
  onResponse?(response: any): any;
  onResponseError?(error: any): any;
}
```

### IHttpClient

```typescript
interface IHttpClient {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
  patch<T>(url: string, data?: any, config?: any): Promise<T>;
  request<T>(config: any): Promise<T>;
}
```

## License

ISC

## Repository

- **GitHub**: [https://github.com/necipsunbul/algo-network](https://github.com/necipsunbul/algo-network)
- **Issues**: [Report bugs or request features](https://github.com/necipsunbul/algo-network/issues)
- **Discussions**: [Join the community discussion](https://github.com/necipsunbul/algo-network/discussions)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

### Development

```bash
# Clone the repository
git clone https://github.com/necipsunbul/algo-network.git

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```
