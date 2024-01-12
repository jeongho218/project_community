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
import { CommentDto } from './dto/request/comment.request.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { ForbiddenResponseDto } from '../common/dto/403Forbidden.response.dto';
import { FailedToCommentResponseDto } from './dto/response/failedToComment.response.dto';
import { SucceedToCommentResponseDto } from './dto/response/succeedToComment.response.dto';
import { NotFoundPostResponseDto } from '../common/dto/404NotFound.response.dto';
import { GetCommentResponseDto } from './dto/response/getComment.response.dto';
import { CountPostResponseDto } from '../posts/dto/response/countPost.response.dto';
import { SucceedToUpdateCommentResponseDto } from './dto/response/succeedToUpdateComment.response.dto';
import { SucceedToDeleteCommentResponseDto } from './dto/response/succeedToDeleteComment.response.dto';

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
    status: 201,
    description:
      '댓글이 성공적으로 작성되었을 경우 반환되는 내용. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 문자열만 출력됩니다.',
    type: SucceedToCommentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      '댓글 작성 실패 시 반환되는 내용, 잘못된 Body("comment"가 없거나, 문자열이 아님)가 입력되었을 경우',
    type: FailedToCommentResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태에서 댓글 작성을 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글 번호',
    type: NotFoundPostResponseDto,
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
  @ApiResponse({
    status: 200,
    description:
      '게시글에 달린 댓글을 가져올때 반환되는 내용, 배열의 형태로 출력됩니다.',
    type: GetCommentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글 번호',
    type: NotFoundPostResponseDto,
  })
  @Get(':postId/comment')
  async readComments(@Param('postId') postId: number) {
    return await this.commentsService.readComments(postId);
  }

  // 댓글 개수 세기 - 완료
  @ApiOperation({
    summary: '댓글 개수 세기',
    description: '게시글에 달린 댓글의 개수를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description:
      '게시글에 달린 댓글의 개수를 반환합니다. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 숫자만 출력됩니다.',
    type: CountPostResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글 번호',
    type: NotFoundPostResponseDto,
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
    status: 200,
    description:
      '댓글 수정 시 반환되는 내용. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 문자열만 출력됩니다.',
    type: SucceedToUpdateCommentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      '댓글 수정 실패 시 반환되는 내용, 잘못된 Body("comment"가 없거나, 문자열이 아님)가 입력되었을 경우',
    type: FailedToCommentResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태, 혹은 자신이 작성하지 않은 댓글의 수정을 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글/댓글 번호',
    type: NotFoundPostResponseDto,
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
    status: 200,
    description:
      '댓글 수정 시 반환되는 내용. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 문자열만 출력됩니다.',
    type: SucceedToDeleteCommentResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태, 혹은 자신이 작성하지 않은 댓글의 삭제를 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글/댓글 번호',
    type: NotFoundPostResponseDto,
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
