import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure body parser limits
  app.use(express.json({ limit: '50mb' })); // Adjust size as needed
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Enable CORS for frontend
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
    credentials: true,
  });

  // Add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('CloudForge API')
    .setDescription(
      `
      Welcome to the CloudForge API documentation. This API provides endpoints for managing:
      
      * Customers - Create and manage customer information
      * Inventory - Track and manage inventory items
      * Quotes - Create and manage quotes for customers
      * Orders - Process and track customer orders
      * Invoices - Generate and manage invoices
      
      ## Authentication
      Most endpoints require authentication using JWT Bearer tokens.
      Get your token by using the /auth/login endpoint.
      
      ## Rate Limiting
      API calls are limited to 100 requests per minute per IP address.
      
      ## Environments
      - Production: https://api.cloudforge.com
      - Staging: https://staging-api.cloudforge.com
      - Development: http://localhost:3001
    `,
    )
    .setVersion('1.0')
    .addServer('http://localhost:3001', 'Local Development')
    .addServer('https://staging-api.cloudforge.com', 'Staging')
    .addServer('https://api.cloudforge.com', 'Production')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Customers', 'Customer management endpoints')
    .addTag('Inventory', 'Inventory management endpoints')
    .addTag('Quotes', 'Quote management endpoints')
    .addTag('Orders', 'Order management endpoints')
    .addTag('Invoices', 'Invoice management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Customize Swagger UI
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tryItOutEnabled: true,
      syntaxHighlight: {
        theme: 'monokai',
      },
    },
    customSiteTitle: 'CloudForge API Documentation',
    customfavIcon: 'https://your-domain.com/favicon.ico',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info__title { font-size: 32px; font-weight: bold; }
      .swagger-ui .info__description { font-size: 16px; line-height: 1.5; }
      .swagger-ui .scheme-container { background-color: #f8f9fa; }
    `,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger documentation available at: http://localhost:${port}/api`,
  );
}
bootstrap();
