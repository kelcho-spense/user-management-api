import { initializeCosmosDB } from "./config/cosmosClient";
import config from "./config/env";
import logger from "./utils/logger";

import app from "./app";


// Start server
(async () => {
    try {
        // Initialize CosmosDB
        await initializeCosmosDB().catch((error) => {
            throw error;
        })
        const PORT = config.port;  // Port number from config file
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error: any) {
        logger.error('Error initializing Cosmos DB:', error.message);
        logger.error('Stack trace:', error.stack);
        throw error;
    }

})();