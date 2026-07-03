import { Global, Module, Provider } from '@nestjs/common';
import {
  blobStorageConfigFactory,
  BlobStorageConfig,
} from '../../config/blob-storage.config';

const BLOB_STORAGE_CONFIG_PROVIDER: Provider<BlobStorageConfig> = {
  provide: 'BLOB_STORAGE_CONFIG',
  useFactory: blobStorageConfigFactory,
};

@Global()
@Module({
  providers: [BLOB_STORAGE_CONFIG_PROVIDER],
  exports: [BLOB_STORAGE_CONFIG_PROVIDER],
})
export class BlobStorageModule {}
