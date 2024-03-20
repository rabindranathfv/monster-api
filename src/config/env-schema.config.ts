import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'staging', 'test'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.string(),
  DB_NAME: Joi.string(),
  MONGO_URL: Joi.string().optional(),
  TTL_CACHE: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().default(10),
});
