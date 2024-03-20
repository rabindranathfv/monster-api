export const loadConfig = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URL:
    process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URL
      : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  PORT: +process.env.PORT || 3000,
  CACHE: {
    ttl: process.env.TTL_CACHE,
  },
  REDIS: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  DEFAULT_LIMIT: +process.env.DEFAULT_LIMIT || 10,
});
