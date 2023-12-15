import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // hot reload(webpack)
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Community API Document')
    .setDescription('The Community API description')
    .setVersion('0.1')
    .addTag('Community')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✅ Server start with port ${port}`);
}
bootstrap();
