import { databaseConfigFactory } from './database.config';

describe('database.config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('databaseConfigFactory', () => {
    it('should return local configuration when ENVIRONMENT=local', () => {
      process.env.ENVIRONMENT = 'local';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';
      process.env.DB_USER = 'postgres';
      process.env.DB_PASSWORD = 'postgres';
      process.env.DB_NAME = 'daily_health';
      process.env.DB_LOGGING = 'true';
      process.env.DB_SYNCHRONIZE = 'false';

      const config = databaseConfigFactory();

      expect(config.type).toBe('postgres');
      expect(config.host).toBe('localhost');
      expect(config.port).toBe(5432);
      expect(config.username).toBe('postgres');
      expect(config.password).toBe('postgres');
      expect(config.database).toBe('daily_health');
      expect(config.ssl).toBe(false);
      expect(config.synchronize).toBe(false);
      expect(config.logging).toBe(true);
      expect(config.retryAttempts).toBe(3);
      expect(config.retryDelay).toBe(3000);
      expect(config.migrationsRun).toBe(true);
    });

    it('should return production configuration when ENVIRONMENT=production', () => {
      process.env.ENVIRONMENT = 'production';
      process.env.DATABASE_URL = 'postgresql://user:pass@host:5432/db?sslmode=require';
      process.env.DB_LOGGING = 'false';
      process.env.DB_SYNCHRONIZE = 'false';

      const config = databaseConfigFactory();

      expect(config.type).toBe('postgres');
      expect(config.url).toBe('postgresql://user:pass@host:5432/db?sslmode=require');
      expect(config.ssl).toBe(true);
      expect(config.synchronize).toBe(false);
      expect(config.logging).toBe(false);
      expect(config.retryAttempts).toBe(3);
      expect(config.retryDelay).toBe(3000);
      expect(config.migrationsRun).toBe(true);
    });

    it('should configure retry logic correctly', () => {
      process.env.ENVIRONMENT = 'local';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';
      process.env.DB_USER = 'postgres';
      process.env.DB_PASSWORD = 'postgres';
      process.env.DB_NAME = 'daily_health';
      process.env.DB_LOGGING = 'true';
      process.env.DB_SYNCHRONIZE = 'false';

      const config = databaseConfigFactory();

      expect(config.retryAttempts).toBe(3);
      expect(config.retryDelay).toBe(3000);
    });

    it('should configure migrations to run automatically', () => {
      process.env.ENVIRONMENT = 'local';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';
      process.env.DB_USER = 'postgres';
      process.env.DB_PASSWORD = 'postgres';
      process.env.DB_NAME = 'daily_health';
      process.env.DB_LOGGING = 'true';
      process.env.DB_SYNCHRONIZE = 'false';

      const config = databaseConfigFactory();

      expect(config.migrationsRun).toBe(true);
    });

    it('should parse DB_PORT as number for local environment', () => {
      process.env.ENVIRONMENT = 'local';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';
      process.env.DB_USER = 'postgres';
      process.env.DB_PASSWORD = 'postgres';
      process.env.DB_NAME = 'daily_health';
      process.env.DB_LOGGING = 'true';
      process.env.DB_SYNCHRONIZE = 'false';

      const config = databaseConfigFactory();

      expect(config.port).toBe(5432);
      expect(typeof config.port).toBe('number');
    });

    it('should parse DB_LOGGING as boolean', () => {
      process.env.ENVIRONMENT = 'local';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';
      process.env.DB_USER = 'postgres';
      process.env.DB_PASSWORD = 'postgres';
      process.env.DB_NAME = 'daily_health';
      process.env.DB_LOGGING = 'true';
      process.env.DB_SYNCHRONIZE = 'false';

      const config = databaseConfigFactory();

      expect(config.logging).toBe(true);
      expect(typeof config.logging).toBe('boolean');
    });

    it('should parse DB_SYNCHRONIZE as boolean', () => {
      process.env.ENVIRONMENT = 'local';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';
      process.env.DB_USER = 'postgres';
      process.env.DB_PASSWORD = 'postgres';
      process.env.DB_NAME = 'daily_health';
      process.env.DB_LOGGING = 'true';
      process.env.DB_SYNCHRONIZE = 'false';

      const config = databaseConfigFactory();

      expect(config.synchronize).toBe(false);
      expect(typeof config.synchronize).toBe('boolean');
    });
  });
});
