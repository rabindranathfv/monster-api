import { validationSchema } from './env-schema.config';
describe('Validation Schema', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it('should validate a valid environment variable object', () => {
    const validEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_LIMIT: 200,
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };

    const { error } = validationSchema.validate(validEnv);
    expect(error).toBeFalsy();

    const { error: errorWithoutOptionals } =
      validationSchema.validate(validEnv);
    expect(errorWithoutOptionals).toBeFalsy();
  });

  it('should validate a valid environment variable object with all optional fields', () => {
    const validEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      MONGO_URL: 'mongodb://localhost:27017/my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REDIS_USER: 'redis_user',
      REDIS_PASSWORD: 'redis_password',
      DEFAULT_LIMIT: 10,
      REQUEST_LIMIT: 200,
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };

    const { error } = validationSchema.validate(validEnv);
    expect(error).toBeFalsy();
  });

  it('should throw an error for an invalid NODE_ENV', () => {
    const invalidEnv = {
      NODE_ENV: 'invalid_env',
      PORT: 3000,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_LIMIT: 100,
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };

    const { error } = validationSchema.validate(invalidEnv);

    expect(error).toBeTruthy();
    expect(error.details[0].message).toContain(
      '"NODE_ENV" must be one of [development, production, staging, test]',
    );
  });

  it('should throw an error for missing required fields', () => {
    // Missing DB_HOST, DB_PORT, DB_NAME, TTL_CACHE, REDIS_HOST, REDIS_PORT, REQUEST_TTL, API_KEY, JWT_SECRET, JWT_EXPIRES_IN
    const invalidEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
    };

    const { error } = validationSchema.validate(invalidEnv);

    expect(error).toBeTruthy();
    expect(error.details.length).toBeGreaterThan(0);
  });

  it('should throw an error for invalid PORT', () => {
    const invalidEnv = {
      NODE_ENV: 'development',
      PORT: 'invalid_port',
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_LIMIT: 100,
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };

    const { error } = validationSchema.validate(invalidEnv);

    expect(error).toBeTruthy();
    expect(error.details[0].message).toContain('"PORT" must be a number');
  });
  it('should require DB_HOST', () => {
    const invalidEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };
    const { error } = validationSchema.validate(invalidEnv);
    expect(error).toBeTruthy();
    expect(error.details[0].message).toContain('"DB_HOST" is required');
  });

  it('should require DB_PORT', () => {
    const invalidEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      // Missing DB_PORT
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };
    const { error } = validationSchema.validate(invalidEnv);
    expect(error).toBeTruthy();
    expect(error.details[0].message).toContain('"DB_PORT" is required');
  });

  it('should validate DB_HOST correctly', () => {
    const validEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };
    const { error } = validationSchema.validate(validEnv);
    expect(error).toBeFalsy();
  });

  it('should validate DB_PORT correctly', () => {
    const validEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };
    const { error } = validationSchema.validate(validEnv);
    expect(error).toBeFalsy();
  });

  it('should require API_KEY', () => {
    const invalidEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_TTL: 60,
      // Missing API_KEY
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };
    const { error } = validationSchema.validate(invalidEnv);
    expect(error).toBeTruthy();
    expect(error.details[0].message).toContain('"API_KEY" is required');
  });

  it('should validate API_KEY correctly', () => {
    const validEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };
    const { error } = validationSchema.validate(validEnv);
    expect(error).toBeFalsy();
  });

  it('should require JWT_SECRET', () => {
    const invalidEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      // Missing JWT_SECRET
      JWT_EXPIRES_IN: '3600',
    };
    const { error } = validationSchema.validate(invalidEnv);
    expect(error).toBeTruthy();
    expect(error.details[0].message).toContain('"JWT_SECRET" is required');
  });

  it('should validate JWT_SECRET correctly', () => {
    const validEnv = {
      NODE_ENV: 'development',
      PORT: 3001,
      DB_HOST: 'localhost',
      DB_PORT: '27017',
      DB_NAME: 'my_database',
      TTL_CACHE: '3600',
      REDIS_HOST: 'redis-server',
      REDIS_PORT: '6379',
      REQUEST_TTL: 60,
      API_KEY: 'your_api_key',
      JWT_SECRET: 'your_jwt_secret',
      JWT_EXPIRES_IN: '3600',
    };
    const { error } = validationSchema.validate(validEnv);
    expect(error).toBeFalsy();
  });
});
