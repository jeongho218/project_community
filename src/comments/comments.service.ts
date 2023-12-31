import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}

  // 댓글 작성
  createComments() {
    this.commentsRepository.save({});
  }

  // 댓글 조회
  readComments() {
    this.commentsRepository.find({});
  }

  // 댓글 수정
  updateComments() {
    // 게시글이 존재하는지 확인
    // 현재 로그인한 사용자가 댓글 작성자인지 확인
    // this.commentsRepository.update({});
  }

  // 댓글 삭제
  deleteComments() {
    // 게시글이 존재하는지 확인
    // 현재 로그인한 사용자가 댓글 작성자인지 확인
    // this.commentsRepository.delete()
  }
}
