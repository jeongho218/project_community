import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}

  // 글 작성
  async createPost(title: string, content: string, id: number) {
    await this.postsRepository.save({
      title: title,
      content: content,
      userId: id,
    });
  }

  // 전체 글 가져오기
  getAllPost() {}

  // 특정 글 가져오기
  getSpecificPost() {}

  // 글 수정
  updatePost() {}

  // 글 삭제
  deletePost() {}
}
