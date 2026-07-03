import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { BlobStorageModule } from './modules/blob-storage/blob-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    BlobStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
