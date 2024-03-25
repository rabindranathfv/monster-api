import { loadConfig } from './env.config';

describe('LoadConfig unit test', () => {
  it('should return a configuration object with default values when environment variables are set to empty strings', () => {
    process.env.NODE_ENV = '';
    process.env.DB_HOST = '';
    process.env.DB_PORT = '';
    process.env.DB_NAME = '';
    process.env.PORT = '';
    process.env.DEFAULT_LIMIT = '';

    const config = loadConfig();
    expect(config).toEqual({
      NODE_ENV: 'development',
      MONGO_URL: 'mongodb://:/',
      PORT: 3000,
      CACHE: {
        ttl: NaN,
      },
      REDIS: {
        host: undefined,
        port: NaN,
        password: undefined,
        user: undefined,
      },
      REQUEST_RATE_LIMIT: {
        ttl: NaN,
        limit: NaN,
      },
      API_KEY: undefined,
      JWT: {
        secret: undefined,
        expiresIn: undefined,
      },
      DEFAULT_LIMIT: 10,
    });

    // Reset environment variables
    process.env.NODE_ENV = 'test';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '27017';
    process.env.DB_NAME = 'test';
    process.env.PORT = '5000';
    process.env.TTL_CACHE = '3600';
    process.env.REDIS_HOST = 'localhost';
    process.env.REDIS_PORT = '6379';
    process.env.REDIS_PASSWORD = 'password';
    process.env.REDIS_USER = 'user';
    process.env.REQUEST_TTL = '60';
    process.env.REQUEST_LIMIT = '100';
    process.env.API_KEY = '1234567890';
    process.env.JWT_SECRET = 'secret';
    process.env.JWT_EXPIRES_IN = '3600';
    process.env.DEFAULT_LIMIT = '20';
  });

  it('should return a configuration object with values based on environment variables when they are set', () => {
    process.env.NODE_ENV = 'production';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '27017';
    process.env.DB_NAME = 'mydb';
    process.env.PORT = '5000';
    process.env.TTL_CACHE = '3600';
    process.env.REDIS_HOST = 'redis.example.com';
    process.env.REDIS_PORT = '6379';
    process.env.REDIS_PASSWORD = 'password';
    process.env.REDIS_USER = 'user';
    process.env.REQUEST_TTL = '60';
    process.env.REQUEST_LIMIT = '100';
    process.env.API_KEY = 'myapikey';
    process.env.JWT_SECRET = 'myjwtsecret';
    process.env.JWT_EXPIRES_IN = '3600';
    process.env.DEFAULT_LIMIT = '20';

    const config = loadConfig();

    expect(config).toEqual({
      NODE_ENV: 'production',
      MONGO_URL: 'mongodb://localhost:27017/mydb',
      PORT: 5000,
      CACHE: {
        ttl: 3600,
      },
      REDIS: {
        host: 'redis.example.com',
        port: 6379,
        password: 'password',
        user: 'user',
      },
      REQUEST_RATE_LIMIT: {
        ttl: 60,
        limit: 100,
      },
      API_KEY: 'myapikey',
      JWT: {
        secret: 'myjwtsecret',
        expiresIn: '3600',
      },
      DEFAULT_LIMIT: 20,
    });

    // Reset environment variables
    process.env.NODE_ENV = '';
    process.env.DB_HOST = '';
    process.env.DB_PORT = '';
    process.env.DB_NAME = '';
    process.env.PORT = '';
    process.env.TTL_CACHE = '';
    process.env.REDIS_HOST = '';
    process.env.REDIS_PORT = '';
    process.env.REDIS_PASSWORD = '';
    process.env.REDIS_USER = '';
    process.env.REQUEST_TTL = '';
    process.env.REQUEST_LIMIT = '';
    process.env.API_KEY = '';
    process.env.JWT_SECRET = '';
    process.env.JWT_EXPIRES_IN = '';
    process.env.DEFAULT_LIMIT = '';
  });

  it('should parse numeric values from environment variables correctly', () => {
    process.env.TTL_CACHE = '600';
    process.env.REDIS_PORT = '6379';
    process.env.REQUEST_TTL = '30';
    process.env.REQUEST_LIMIT = '50';
    process.env.DEFAULT_LIMIT = '5';

    const config = loadConfig();

    expect(config.CACHE.ttl).toBe(600);
    expect(config.REDIS.port).toBe(6379);
    expect(config.REQUEST_RATE_LIMIT.ttl).toBe(30);
    expect(config.REQUEST_RATE_LIMIT.limit).toBe(50);
    expect(config.DEFAULT_LIMIT).toBe(5);

    // Reset environment variables
    process.env.TTL_CACHE = '';
    process.env.REDIS_PORT = '';
    process.env.REQUEST_TTL = '';
    process.env.REQUEST_LIMIT = '';
    process.env.DEFAULT_LIMIT = '';
  });

  it('should return a configuration object with all properties when all environment variables are set', () => {
    process.env.NODE_ENV = 'test';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '27017';
    process.env.DB_NAME = 'mydb';
    process.env.PORT = '8080';
    process.env.TTL_CACHE = '1800';
    process.env.REDIS_HOST = 'redis.example.com';
    process.env.REDIS_PORT = '6379';
    process.env.REDIS_PASSWORD = 'password';
    process.env.REDIS_USER = 'user';
    process.env.REQUEST_TTL = '120';
    process.env.REQUEST_LIMIT = '200';
    process.env.API_KEY = 'myapikey';
    process.env.JWT_SECRET = 'myjwtsecret';
    process.env.JWT_EXPIRES_IN = '7200';
    process.env.DEFAULT_LIMIT = '15';

    const config = loadConfig();

    expect(config).toEqual({
      NODE_ENV: 'test',
      MONGO_URL: 'mongodb://localhost:27017/mydb',
      PORT: 8080,
      CACHE: {
        ttl: 1800,
      },
      REDIS: {
        host: 'redis.example.com',
        port: 6379,
        password: 'password',
        user: 'user',
      },
      REQUEST_RATE_LIMIT: {
        ttl: 120,
        limit: 200,
      },
      API_KEY: 'myapikey',
      JWT: {
        secret: 'myjwtsecret',
        expiresIn: '7200',
      },
      DEFAULT_LIMIT: 15,
    });

    // Reset environment variables
    process.env.NODE_ENV = '';
    process.env.DB_HOST = '';
    process.env.DB_PORT = '';
    process.env.DB_NAME = '';
    process.env.PORT = '';
    process.env.TTL_CACHE = '';
    process.env.REDIS_HOST = '';
    process.env.REDIS_PORT = '';
    process.env.REDIS_PASSWORD = '';
    process.env.REDIS_USER = '';
    process.env.REQUEST_TTL = '';
    process.env.REQUEST_LIMIT = '';
    process.env.API_KEY = '';
    process.env.JWT_SECRET = '';
    process.env.JWT_EXPIRES_IN = '';
    process.env.DEFAULT_LIMIT = '';
  });
});
