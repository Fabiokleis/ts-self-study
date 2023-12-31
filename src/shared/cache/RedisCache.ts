import cacheConfig from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';

class RedisCache {
  private client: RedisClient | undefined;

  constructor() {
    if (!this.client) {
      this.client = new Redis(cacheConfig.config.redis);
    }
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client?.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client?.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async invalidade(key: string): Promise<void> {
    await this.client?.del(key);
  }
  
}

export default new RedisCache();
