import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Repository } from 'typeorm';

import { Posts } from '../posts/posts.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  // 댓글 작성 - 완료
  async createComments(postId: number, comment: string, userId: number) {
    // 게시글이 존재하는지 확인
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    await this.commentsRepository.save({
      postId: postId,
      comment: comment,
      userId: userId,
    });
  }

  // 댓글 조회 - 완료
  readComments(postId: number) {
    return this.commentsRepository.find({
      where: { postId: postId },
      select: ['id', 'postId', 'userId', 'comment'],
    });
  }

  // 댓글 개수 세기 - 완료
  countComment(postId: number) {
    return this.commentsRepository.count({ where: { postId: postId } });
  }

  // 댓글 수정 - 작성 중
  async updateComments(
    postId: number,
    id: number,
    comment: string,
    userId: number,
  ) {
    // 게시글이 존재하는지 확인
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
    //
    // 댓글이 존재하는지 확인
    const cmt = await this.commentsRepository.findOne({ where: { id: id } });
    if (!cmt) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    //
    // 현재 로그인한 사용자가 댓글 작성자인지 확인
    if (cmt.userId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }
    // this.commentsRepository.update({});
  }

  // 댓글 삭제 - 작성 중
  async deleteComments(postId: number, id: number, userId: number) {
    // 게시글이 존재하는지 확인
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
    //
    // 댓글이 존재하는지 확인
    const cmt = await this.commentsRepository.findOne({ where: { id: id } });
    if (!cmt) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    //
    // 현재 로그인한 사용자가 댓글 작성자인지 확인
    if (cmt.userId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }
    // this.commentsRepository.delete()
  }
}
