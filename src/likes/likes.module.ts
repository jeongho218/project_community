import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './likes.entity';
import { Posts } from '../posts/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes, Posts])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
