import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: false,
  });

  adapter.enableCors({
    credentials: true,
  });

  adapter.register(fastifyCookie);
  adapter.register(fastifyMultipart);

  const app = await NestFactory.create(AppModule, adapter);

  const config = new DocumentBuilder()
    .setTitle('NestJS with Fastify')
    .setDescription('API documentation for the NestJS app using Fastify')
    .setVersion('1.0')
    .addBearerAuth() // Add authorization header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log('API running on http://localhost:3000');
  console.log('Swagger Docs available at http://localhost:3000/api-docs');
}
bootstrap();
