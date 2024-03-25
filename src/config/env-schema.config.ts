import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging', 'test')
    .required(),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  MONGO_URL: Joi.string().optional(),
  TTL_CACHE: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  REDIS_USER: Joi.string().optional(),
  REDIS_PASSWORD: Joi.string().optional(),
  DEFAULT_LIMIT: Joi.number().default(10),
  REQUEST_LIMIT: Joi.number().default(100),
  REQUEST_TTL: Joi.number().required(),
  API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});
