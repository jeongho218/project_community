import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { Users } from './../users/users.entity';
import { CommentDto } from './dto/comment.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';

@ApiTags('COMMENTS')
@Controller('api/posts')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // 댓글 작성 - 완료
  @ApiOperation({ summary: '댓글 작성' })
  @UseGuards(LoggedInGuard)
  @Post(':postId/comment')
  async createComments(
    @Param('postId') postId: number,
    @Body() body: CommentDto,
    @User() user: Users,
  ) {
    await this.commentsService.createComments(postId, body.comment, user.id);
    return `댓글 작성 완료`;
  }

  // 댓글 조회 - 완료
  @ApiOperation({ summary: '댓글 조회' })
  @Get(':postId/comment')
  readComments(@Param('postId') postId: number) {
    const comment = this.commentsService.readComments(postId);
    return comment;
  }

  // 댓글 개수 세기 - 완료
  @ApiOperation({ summary: '댓글 개수 세기' })
  @Get(':postId/comment/count')
  countComment(@Param('postId') postId: number) {
    return this.commentsService.countComment(postId);
  }

  // 댓글 수정 - 완료
  @ApiOperation({ summary: '댓글 수정' })
  @UseGuards(LoggedInGuard)
  @Patch(':postId/comment/:id')
  async updateComments(
    @Param('postId') postId: number,
    @Param('id') id: number,
    @Body() body: CommentDto,
    @User() user: Users,
  ) {
    await this.commentsService.updateComments(
      postId,
      id,
      body.comment,
      user.id,
    );
    return `댓글 수정 완료`;
  }

  // 댓글 삭제 - 완료
  @ApiOperation({ summary: '댓글 삭제' })
  @UseGuards(LoggedInGuard)
  @Delete(':postId/comment/:id')
  async deleteComments(
    @Param('postId') postId: number,
    @Param('id') id: number,
    @User() user: Users,
  ) {
    await this.commentsService.deleteComments(postId, id, user.id);
    return `댓글 삭제 완료`;
  }
}
