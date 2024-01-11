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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { Users } from './../users/users.entity';
import { CommentDto } from './dto/comment.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { ForbiddenResponseDto } from '../common/dto/403Forbidden.response.dto';

@ApiTags('COMMENTS')
@Controller('api/posts')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // 댓글 작성 - 완료
  @ApiOperation({
    summary: '댓글 작성',
    description:
      '게시글에 댓글을 작성합니다. 가드가 설정되어 있어 로그인 상태가 아니라면 사용할 수 없습니다. ',
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태에서 댓글 작성을 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
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
  @ApiOperation({
    summary: '댓글 조회',
    description: '게시글에 달린 댓글을 조회합니다.',
  })
  @Get(':postId/comment')
  readComments(@Param('postId') postId: number) {
    const comment = this.commentsService.readComments(postId);
    return comment;
  }

  // 댓글 개수 세기 - 완료
  @ApiOperation({
    summary: '댓글 개수 세기',
    description: '게시글에 달린 댓글의 개수를 조회합니다.',
  })
  @Get(':postId/comment/count')
  countComment(@Param('postId') postId: number) {
    return this.commentsService.countComment(postId);
  }

  // 댓글 수정 - 완료
  @ApiOperation({
    summary: '댓글 수정',
    description:
      '게시글에 달린 댓글을 수정합니다. 가드가 설정되어 있어 로그인 상태가 아니라면 사용할 수 없습니다. 본인이 작성한 댓글이 아니라면 수정할 수 없습니다.',
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태에서 댓글 수정을 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
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
  @ApiOperation({
    summary: '댓글 삭제',
    description:
      '게시글에 달린 댓글을 삭제합니다. 가드가 설정되어 있어 로그인 상태가 아니라면 사용할 수 없습니다. 본인이 작성한 댓글이 아니라면 삭제할 수 없습니다.',
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태에서 댓글 삭제 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
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
