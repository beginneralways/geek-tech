import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    // Set global prefix for all routes
    app.setGlobalPrefix('api/v1');

    const config = new DocumentBuilder().setTitle('Project TEST').setDescription(' Survey ').setVersion('1.0').addTag('GEEK_TECH_TEST').addBearerAuth().build();
``
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/X', app, document);
    // Start the application on the specified port
    const port = process.env.APP_PORT;
    // Enable CORS
    app.enableCors({
        origin: true,
        // CORS HTTP methods
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    await app.listen(port);
}

bootstrap()
    .then(() => {
        Logger.log(`Server running on http://localhost:${process.env.APP_PORT}/`);
        Logger.log(`For API documentation on http://localhost:${process.env.APP_PORT}/api/v1/X/`);
    })
    .catch((error) => {
        console.log('Error: ', error.measure || error || error.message);
    });
