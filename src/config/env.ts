// src/config/env.ts
import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Define the environment schema
const EnvSchema = z.object({
    // Node Server Configuration
    NODE_ENV: z.enum(['PRODUCTION', 'DEVELOPMENT']).default('DEVELOPMENT'),
    PORT: z.coerce.number().default(8000),

    // CosmosDB Configuration
    AZURE_COSMOS_DB_ENDPOINT: z.string({
        required_error: "AZURE_COSMOS_DB_ENDPOINT is required",
        invalid_type_error: "AZURE_COSMOS_DB_ENDPOINT must be a string",
    }),
    AZURE_COSMOS_DB_KEY: z.string({
        required_error: "AZURE_COSMOS_DB_KEY is required",
        invalid_type_error: "AZURE_COSMOS_DB_KEY must be a string",
    }),
    AZURE_COSMOS_DB_DATABASE_NAME: z.string({
        required_error: "AZURE_COSMOS_DB DB Name is required",
        invalid_type_error: "AZURE_COSMOS_DB must be a string",
    }),    
});

// Parse and validate the environment variables
export const env = EnvSchema.parse(process.env);

// Configuration object consolidating all settings
const config = {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    cosmos: {
        endpoint: env.AZURE_COSMOS_DB_ENDPOINT,
        key: env.AZURE_COSMOS_DB_KEY,
        database: env.AZURE_COSMOS_DB_DATABASE_NAME,
        containers: {
            users: 'usersContainer',
        },
    },
    
};

export default config;
