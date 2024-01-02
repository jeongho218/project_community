import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  // 게시글 개수 세기 - 완료
  async countPost() {
    return await this.postsRepository.count();
  }

  // 전체 글 가져오기 - 완료
  async getAllPost() {
    return await this.postsRepository.find({});
  }

  // 특정 글 가져오기 - 완료
  async getSpecificPost(postId: number) {
    // 게시글이 존재하는지 확인
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
    return post;
  }

  // 글 수정 - 완료
  async updatePost(
    postId: number,
    title: string,
    content: string,
    userId: number,
  ) {
    // 게시글이 존재하는지 확인
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    // 현재 로그인한 사용자가 글 작성자인지 확인
    if (post.userId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    await this.postsRepository.update(postId, {
      title: title,
      content: content,
    });
  }

  // 글 삭제 - 완성
  async deletePost(id: number, userId: number) {
    // 게시글이 존재하는지 확인
    const post = await this.postsRepository.findOne({ where: { id: id } });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    // 현재 로그인한 사용자가 글 작성자인지 확인
    if (post.userId !== userId) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    await this.postsRepository.delete(id);
    return true;
  }
}
