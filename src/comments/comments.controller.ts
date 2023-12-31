import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('COMMENTS')
@Controller('api/posts/:id/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // 댓글 작성
  @ApiOperation({ summary: '댓글 작성' })
  @Post()
  createComments() {
    this.commentsService.createComments();
    return `댓글 작성 완료`;
  }

  // 댓글 조회
  @ApiOperation({ summary: '댓글 조회' })
  @Get()
  readComments() {
    const comment = this.commentsService.readComments();
    return comment;
  }

  // 댓글 수정
  @ApiOperation({ summary: '댓글 수정' })
  @Patch()
  updateComments() {
    this.commentsService.updateComments();
    return `댓글 수정 완료`;
  }

  // 댓글 삭제
  @ApiOperation({ summary: '댓글 삭제' })
  @Delete()
  deleteComments() {
    this.commentsService.deleteComments();
    return `댓글 삭제 완료`;
  }
}
