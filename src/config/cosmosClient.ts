// server/src/config/cosmosdb.config.ts
import { PartitionKeyDefinitionVersion, PartitionKeyKind, Database, CosmosClient, Container } from '@azure/cosmos';

import logger from '../utils/logger';
import config from './env';

let client: CosmosClient;
let database: Database;
let usersContainer: Container;

async function initializeCosmosDB(): Promise<void> {
  try {
    // Create a new CosmosClient instance
    client = new CosmosClient({ endpoint: config.cosmos.endpoint, key: config.cosmos.key });

    // Create or get the database
    const { database: db } = await client.databases.createIfNotExists({ id: config.cosmos.database });
    database = db;

    logger.info(`Database '${config.cosmos.database}' initialized.`);

    // Initialize containers
    usersContainer = await createUsersContainer();

    logger.info('Cosmos DB initialized successfully.');
  } catch (error:any) {
    logger.error('Error initializing Cosmos DB:', error.message);
    throw error;
  }
}
// Create the users container
async function createUsersContainer(): Promise<Container> {
  const containerDefinition = {
    id: config.cosmos.containers.users,
    partitionKey: {
      paths: ['/id'],
      version: PartitionKeyDefinitionVersion.V2,
      kind: PartitionKeyKind.Hash,
    },
  };
  const { container } = await database.containers.createIfNotExists(containerDefinition);
   logger.info(`'${container.id}' is ready.`);
  return container;
}

// Getter functions for containers
function getUsersContainer(): Container {
  if (!usersContainer) {
    throw new Error('user container is not initialized.');
  }
  return usersContainer;
}

export { initializeCosmosDB, getUsersContainer };
