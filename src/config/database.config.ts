export type DatabaseConfig = {
  type: 'postgres';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  url?: string;
  ssl: boolean;
  synchronize: boolean;
  logging: boolean;
  retryAttempts: number;
  retryDelay: number;
  migrationsRun: boolean;
};

export const databaseConfigFactory = (): DatabaseConfig => {
  const environment = process.env.ENVIRONMENT || 'local';

  if (environment === 'production') {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
      retryAttempts: 3,
      retryDelay: 3000,
      migrationsRun: true,
    };
  }

  // Local environment
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'daily_health',
    ssl: false,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
    retryAttempts: 3,
    retryDelay: 3000,
    migrationsRun: true,
  };
};
