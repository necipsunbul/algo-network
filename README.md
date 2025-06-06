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

```typescript
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
import { IInterceptor, IAuthService } from "algo-network-manager";

export class AuthInterceptor implements IInterceptor {
  constructor(private authService: IAuthService) {}

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
  console.log(response.data);
});

client
  .post("/users", {
    name: "John Doe",
    email: "john@example.com",
  })
  .then((response) => {
    console.log("User created:", response.data);
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
});
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
    console.log("Success:", response.data);
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
  get(url: string, config?: any): Promise<any>;
  post(url: string, data?: any, config?: any): Promise<any>;
  put(url: string, data?: any, config?: any): Promise<any>;
  delete(url: string, config?: any): Promise<any>;
  patch(url: string, data?: any, config?: any): Promise<any>;
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
