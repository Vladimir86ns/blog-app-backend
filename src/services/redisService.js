import { createClient } from 'redis';
import logger from './logService.js';

const client = createClient();

client.on('error', (err) => {
  logger.error('Error on redis:', err)
});

let isConnected = false;

async function getRedisClient() {
  if (!isConnected) {
    logger.success('redis connected')
    await client.connect();
    isConnected = true;
  }

  return client;
}

export default getRedisClient;
