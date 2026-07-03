import { BlobStorageModule } from './blob-storage.module';

describe('BlobStorageModule', () => {
  it('should be defined', () => {
    expect(BlobStorageModule).toBeDefined();
  });

  it('should be a global module', () => {
    const moduleMetadata = Reflect.getMetadata(
      'decorators',
      BlobStorageModule,
    ) as unknown[];
    expect(moduleMetadata).toBeDefined();
  });

  it('should export BLOB_STORAGE_CONFIG provider', () => {
    const moduleMetadata = Reflect.getMetadata(
      'imports',
      BlobStorageModule,
    ) as unknown[];
    expect(moduleMetadata).toBeDefined();
  });
});
