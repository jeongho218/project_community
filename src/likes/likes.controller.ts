import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { User } from '../common/decorators/user.decorator';
import { Users } from '../users/users.entity';
import { ForbiddenResponseDto } from '../common/dto/403Forbidden.response.dto';
import { NotFoundPostResponseDto } from '../common/dto/404NotFound.response.dto';
import { AlreadyLikedPostResponseDto } from './dto/alreadyLikedPost.response.dto';
import { SucceedToLikedResponseDto } from './dto/succeedToLiked.response.dto';
import { CountLikeOfPostResponseDto } from './dto/countLikeOfPost.response.dto';

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
  @ApiResponse({
    status: 201,
    description:
      '성공적으로 "좋아요"하였을 경우 반환되는 내용. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 문자열만 출력됩니다.',
    type: SucceedToLikedResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: '로그인하지 않았을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글 번호',
    type: NotFoundPostResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: '이미 좋아요한 게시글인 경우',
    type: AlreadyLikedPostResponseDto,
  })
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
  @ApiResponse({
    status: 200,
    description:
      '게시글에 등록된 "좋아요"의 개수를 반환합니다. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 숫자만 출력됩니다.',
    type: CountLikeOfPostResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글 번호',
    type: NotFoundPostResponseDto,
  })
  @Get(':postId/likes')
  getLikes(@Param('postId') postId: number) {
    return this.likesService.getLikes(postId);
  }
}
