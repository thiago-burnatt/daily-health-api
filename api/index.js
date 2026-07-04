const { NestFactory } = require('@nestjs/core');
const { ValidationPipe, Logger } = require('@nestjs/common');
const { AppModule } = require('../dist/app.module');

const logger = new Logger('VercelHandler');
let app;

async function bootstrap() {
  if (!app) {
    try {
      logger.log('Initializing NestJS application...');
      app = await NestFactory.create(AppModule);
      app.enableCors();
      app.useGlobalPipes(new ValidationPipe());
      await app.init();
      logger.log('NestJS application initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize NestJS application', error);
      throw error;
    }
  }
  return app;
}

module.exports = async function handler(req, res) {
  try {
    logger.log(`Handling request: ${req.method} ${req.url}`);
    const app = await bootstrap();
    const server = app.getHttpAdapter().getInstance();
    server(req, res);
  } catch (error) {
    logger.error('Error handling request', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
