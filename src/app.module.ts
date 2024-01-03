import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/posts.entity';
import { CommentsModule } from './comments/comments.module';
import { Comments } from './comments/comments.entity';
import { LikesModule } from './likes/likes.module';
import { Likes } from './likes/likes.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Posts, Comments, Likes],
      synchronize: false /**  개발 환경일 때만 true일 것
      직접 작성한 엔터티를 DB에 적용할 때 쓰이므로, 
      true일 경우 DB가 새로 생성되어 기존 DB에 저장된 데이터가 사라질 위험성이 있음*/,
      logging: true /**ORM이 어떤 쿼리를 전송했는지 확인하는 용도 */,
      keepConnectionAlive:
        true /** 어플리케이션이 종료되어도 DB 연결을 유지하는 설정 
        hot reload 때 마다 DB 연결 끊김 로그 방지 및 jest 테스트를 위해서 true 설정
        https://ctrs.tistory.com/472 */,
      charset: 'utf8mb4_general_ci' /** 이모티콘 사용을 위한 캐릭터셋 */,
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 모든 라우트에 로거 미들웨어 등록
  }
}
