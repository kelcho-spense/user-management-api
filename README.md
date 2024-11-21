# User Management API

The User Management API is a Node.js application built with Express and TypeScript. It provides RESTful endpoints for managing user data using Azure Cosmos DB.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete users.
- **TypeScript**: Strongly typed codebase for better reliability.
- **Azure Cosmos DB**: Integration with Cosmos DB for scalable storage.
- **Input Validation**: Uses Zod for validating request data.
- **Logging**: Uses Pino for logging with rotating file streams.
- **Rate Limiting**: Protects APIs from abuse with `express-rate-limit`.

## Getting Started

### Prerequisites

- Node.js
- pnpm (or npm/yarn)
- Azure Cosmos DB account

### CLone the API
```bash
git clone https://KenyaDataPlatformUserGroup@dev.azure.com/KenyaDataPlatformUserGroup/Azure%20Cosmos%20DB%20Samples/_git/user-management-api-ts

```


### Installation

Navigate to the project directory:

```bash
cd user-management-api-ts
```

Install dependencies:

```sh
pnpm install
```
or
```sh
npm install
```

### Configuration

Create a `.env` file in the root directory and add the following environment variables:

#### Required Environment Variables

- `NODE_ENV`: `PRODUCTION` or `DEVELOPMENT`. Default is `DEVELOPMENT`.
- `PORT`: Port number the server will listen on. Default is `8000`.
- `AZURE_COSMOS_DB_ENDPOINT`: Your Azure Cosmos DB endpoint URL.
- `AZURE_COSMOS_DB_KEY`: Your Azure Cosmos DB primary key.
- `AZURE_COSMOS_DB_DATABASE_NAME`: Name of your Cosmos DB database.

Example `.env` file:

```env
NODE_ENV=DEVELOPMENT
PORT=8000
AZURE_COSMOS_DB_ENDPOINT=your_cosmos_db_endpoint
AZURE_COSMOS_DB_KEY=your_cosmos_db_key
AZURE_COSMOS_DB_DATABASE_NAME=your_database_name
```

### Running the Application

#### Development Mode

Start the server with hot-reloading:

```sh
pnpm dev
```
or 

```sh
npm run dev
```

#### Production Mode

Build the application:

```sh
pnpm build
```

Start the built application:

```sh
pnpm start
```

The server will run on [http://localhost:8000](http://localhost:8000).

## API Endpoints

### Health Check

- **GET** `/api/health`
    - Response: Server status message.

### Users

- **GET** `/api/users`
    - Retrieves a list of all users.
- **GET** `/api/users/:id`
    - Retrieves a user by ID.
- **POST** `/api/users`
    - Creates a new user.
    - Required fields: `name`, `age`, `twitter`, `facebook`.
- **PUT** `/api/users/:id`
    - Updates an existing user.
    - Optional fields: `name`, `age`, `twitter`, `facebook`.
- **DELETE** `/api/users/:id`
    - Deletes a user by ID.

## Testing

You can use tools like Postman or HTTPie to test the API endpoints. Alternatively, you can use the provided `app.http` file with VSCode extensions like REST Client.

## Logging

Logs are managed using Pino and stored in rotating log files using rotating-file-stream. Logs can be found in the `logs` directory.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.