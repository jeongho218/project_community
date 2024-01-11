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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { PostingRequestDto } from './dto/request/posting.request.dto';
import { User } from '../common/decorators/user.decorator';
import { Users } from '../users/users.entity';
import { UpdatePostRequestDto } from './dto/request/updatePost.request.dto';
import { SucceedToCreatePostResponseDto } from './dto/response/succeedToCreatePost.response.dto';
import { ForbiddenResponseDto } from '../common/dto/403Forbidden.response.dto';
import { CountPostResponseDto } from './dto/response/countPost.response.dto';
import { GetPostResponseDto } from './dto/response/getPost.response.dto';
import { NotFoundPostResponseDto } from '../common/dto/404NotFound.response.dto';
import { UpdatedPostResponseDto } from './dto/response/updatePost.response.dto';
import { DeletePostResponseDto } from './dto/response/deletePost.response.dto';

@ApiTags('POSTS')
@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // 글 작성 - 완료
  @ApiOperation({
    summary: '게시글 작성',
    description:
      '게시글을 작성합니다. 가드가 설정되어 있어 로그인 상태가 아니라면 사용할 수 없습니다.',
  })
  @ApiResponse({
    status: 201,
    description: '게시글이 성공적으로 작성되었을 경우 반환되는 내용',
    type: SucceedToCreatePostResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태에서 게시글 작성을 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @UseGuards(LoggedInGuard)
  @Post()
  async createPost(@Body() body: PostingRequestDto, @User() user: Users) {
    await this.postsService.createPost(body.title, body.content, user.id);
    return `'${body.title}' 게시글 작성 완료`;
  }

  // 게시글 개수 세기 - 완료
  @ApiOperation({
    summary: '게시글 개수 세기',
    description: '게시글의 개수를 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    description:
      '게시글의 개수를 반환합니다. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 숫자만 출력됩니다.',
    type: CountPostResponseDto,
  })
  @Get('count')
  countPost() {
    return this.postsService.countPost();
  }

  // 전체 글 가져오기 - 완료
  @ApiOperation({
    summary: '전체 게시글 가져오기',
    description: '게시글 전체를 불러옵니다.',
  })
  @ApiResponse({
    status: 200,
    description:
      '게시글 전체를 가져올때 반환되는 내용, 배열의 형태로 출력됩니다.',
    type: GetPostResponseDto,
  })
  @Get()
  async getAllPost() {
    return await this.postsService.getAllPost();
  }

  // 특정 글 가져오기 - 완료
  @ApiOperation({
    summary: '특정 게시글 가져오기',
    description: '특정 게시글 하나를 불러옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 게시글을 가져올때 반환되는 내용',
    type: GetPostResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글 번호',
    type: NotFoundPostResponseDto,
  })
  @Get(':id')
  getSpecificPost(@Param('id') postId: number) {
    return this.postsService.getSpecificPost(postId);
  }

  // 글 수정 - 완료
  @ApiOperation({
    summary: '게시글 수정',
    description:
      '게시글을 수정합니다. 가드가 설정되어 있어 로그인 상태가 아니라면 사용할 수 없습니다. 본인이 작성한 게시글이 아니라면 수정할 수 없습니다.',
  })
  @ApiResponse({
    status: 200,
    description:
      '게시글을 수정하였을때 반환되는 내용. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 문자열만 출력됩니다.',
    type: UpdatedPostResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태, 혹은 자신이 작성하지 않은 게시글의 수정을 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글 번호',
    type: NotFoundPostResponseDto,
  })
  @UseGuards(LoggedInGuard)
  @Patch(':id')
  async updatePost(
    @Param('id') postId: number,
    @Body() body: UpdatePostRequestDto,
    @User() user: Users,
  ) {
    await this.postsService.updatePost(
      postId,
      body.title,
      body.content,
      user.id,
    );
    return `${postId} 게시글이 수정되었습니다.`;
  }

  // 글 삭제 - 완성
  @ApiOperation({
    summary: '게시글 삭제',
    description:
      '게시글을 삭제합니다. 가드가 설정되어 있어 로그인 상태가 아니라면 사용할 수 없습니다. 본인이 작성한 게시글이 아니라면 삭제할 수 없습니다.',
  })
  @ApiResponse({
    status: 200,
    description:
      '게시글을 수정하였을때 반환되는 내용. 아래 예시와 같이 객체 타입으로 나오는 것이 아닌 값의 자리에 있는 문자열만 출력됩니다.',
    type: DeletePostResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태, 혹은 자신이 작성하지 않은 게시글의 삭제를 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 게시글 번호',
    type: NotFoundPostResponseDto,
  })
  @UseGuards(LoggedInGuard)
  @Delete(':id')
  async deletePost(@Param('id') postId: number, @User() user: Users) {
    await this.postsService.deletePost(postId, user.id);
    return `${postId} 게시글이 삭제되었습니다.`;
  }
}
