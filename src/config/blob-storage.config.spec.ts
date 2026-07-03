import { blobStorageConfigFactory } from './blob-storage.config';

describe('blob-storage.config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('blobStorageConfigFactory', () => {
    it('should return configuration with BLOB_STORE_ID and BLOB_READ_WRITE_TOKEN from environment', () => {
      process.env.BLOB_STORE_ID = 'test-store-id';
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const config = blobStorageConfigFactory();

      expect(config.storeId).toBe('test-store-id');
      expect(config.readWriteToken).toBe('test-token');
    });

    it('should return empty strings when environment variables are not set', () => {
      delete process.env.BLOB_STORE_ID;
      delete process.env.BLOB_READ_WRITE_TOKEN;

      const config = blobStorageConfigFactory();

      expect(config.storeId).toBe('');
      expect(config.readWriteToken).toBe('');
    });

    it('should return empty strings when environment variables are empty', () => {
      process.env.BLOB_STORE_ID = '';
      process.env.BLOB_READ_WRITE_TOKEN = '';

      const config = blobStorageConfigFactory();

      expect(config.storeId).toBe('');
      expect(config.readWriteToken).toBe('');
    });

    it('should load credentials from ConfigService (environment variables)', () => {
      process.env.BLOB_STORE_ID = 'vercel-store-123';
      process.env.BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_token_456';

      const config = blobStorageConfigFactory();

      expect(config.storeId).toBe('vercel-store-123');
      expect(config.readWriteToken).toBe('vercel_blob_rw_token_456');
    });
  });
});
