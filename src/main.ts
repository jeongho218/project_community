import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exceptionFilter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 에러처리
  app.useGlobalPipes(new ValidationPipe()); // class-validation 사용
  app.useGlobalFilters(new HttpExceptionFilter()); // 전체 컨트롤러에서 발생하는 http 관련 에러 처리

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
