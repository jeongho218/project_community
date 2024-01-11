import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { User } from '../common/decorators/user.decorator';
import { Users } from '../users/users.entity';

@ApiTags('LIKES')
@Controller('api/posts')
export class LikesController {
  constructor(private likesService: LikesService) {}

  // 게시글에 좋아요 - 완료
  @ApiOperation({
    summary: '게시글 좋아요 추가',
    description:
      '게시글에 "좋아요"를 추가합니다. 가드가 설정되어 있어 로그인 상태가 아니라면 사용할 수 없습니다.',
  })
  @ApiResponse({})
  @UseGuards(LoggedInGuard)
  @Post(':postId/likes')
  async giveLike(@Param('postId') postId: number, @User() user: Users) {
    await this.likesService.giveLike(postId, user.id);
    return '좋아요 등록 완료';
  }

  // 게시글의 좋아요 개수 조회 - 완료
  @ApiOperation({
    summary: '좋아요 수 조회',
    description: '게시글에 달린 "좋아요"의 개수를 조회합니다.',
  })
  @ApiResponse({})
  @Get(':postId/likes')
  getLikes(@Param('postId') postId: number) {
    return this.likesService.getLikes(postId);
  }
}
