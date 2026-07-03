export type BlobStorageConfig = {
  storeId: string;
  readWriteToken: string;
};

export const blobStorageConfigFactory = (): BlobStorageConfig => {
  return {
    storeId: process.env.BLOB_STORE_ID || '',
    readWriteToken: process.env.BLOB_READ_WRITE_TOKEN || '',
  };
};
