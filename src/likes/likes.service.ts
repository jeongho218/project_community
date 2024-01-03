import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from '../posts/posts.entity';
import { Likes } from './likes.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    @InjectRepository(Likes) private likesRepository: Repository<Likes>,
  ) {}

  // 게시글의 좋아요 개수 조회 - 완료
  async getLikes(postId: number) {
    // 게시글이 존재하는지 확인
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    return this.likesRepository.count({ where: { postId: postId } });
  }

  // 게시글에 좋아요 - 완료
  async giveLike(postId: number, userId: number) {
    // 게시글이 존재하는지 확인
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    // 이미 좋아요 한 기록이 있는지 확인
    const existLike = await this.likesRepository.findOne({
      where: { postId: postId, userId: userId },
    });
    if (existLike) {
      throw new ConflictException('이미 좋아요한 게시글입니다.');
    }

    await this.likesRepository.save({ postId: postId, userId: userId });
  }
}
