import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { User } from '../common/decorators/user.decorator';
import { Users } from '../users/users.entity';

@ApiTags('Likes')
@Controller('api/posts')
export class LikesController {
  constructor(private likesService: LikesService) {}

  // 게시글의 좋아요 개수 조회 - 완료
  @ApiOperation({ summary: '좋아요 수 조회' })
  @Get(':postId/likes')
  getLikes(@Param('postId') postId: number) {
    return this.likesService.getLikes(postId);
  }

  // 게시글에 좋아요 - 완료
  @ApiOperation({ summary: '게시글 좋아요 추가' })
  @UseGuards(LoggedInGuard)
  @Post(':postId/likes')
  async giveLike(@Param('postId') postId: number, @User() user: Users) {
    await this.likesService.giveLike(postId, user.id);
    return '좋아요 등록 완료';
  }
}
