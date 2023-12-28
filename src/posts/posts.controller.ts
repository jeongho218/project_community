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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { PostingRequestDto } from './dto/posting.request.dto';
import { User } from '../common/decorators/user.decorator';
import { Users } from '../users/users.entity';

@ApiTags('POSTS')
@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // 글 작성
  @ApiOperation({ summary: '게시글 작성' })
  @UseGuards(LoggedInGuard)
  @Post()
  async createPost(@Body() body: PostingRequestDto, @User() user: Users) {
    await this.postsService.createPost(body.title, body.content, user.id);
    return `'${body.title}' 게시글 작성 완료`;
  }

  // 게시글 개수 세기 - 완료
  @ApiOperation({ summary: '게시글 개수 세기' })
  @Get('count')
  countPost() {
    return this.postsService.countPost();
  }

  // 전체 글 가져오기 - 기능은 완료되었으나 해당되는 데이터의 내용이 전부 나오고 있으므로 이를 조절할 필요가 있음
  // ReadPostDto를 사용해보자
  @ApiOperation({ summary: '전체 게시글 가져오기' })
  @Get()
  getAllPost() {
    return this.postsService.getAllPost();
  }

  // 특정 글 가져오기 - 기능은 완료되었으나 해당되는 데이터의 내용이 전부 나오고 있으므로 이를 조절할 필요가 있음
  // ReadPostDto를 사용해보자
  @ApiOperation({ summary: '특정 게시글 가져오기' })
  @Get(':id')
  getSpecificPost(@Param('id') postId: number) {
    return this.postsService.getSpecificPost(postId);
  }

  // 글 수정 - 작성 중
  @ApiOperation({ summary: '게시글 수정' })
  @UseGuards(LoggedInGuard)
  @Patch(':id')
  updatePost(@Param('id') postId: number, @User() user: Users) {
    return this.postsService.updatePost(postId, user.id);
  }

  // 글 삭제 - 완성
  @ApiOperation({ summary: '게시글 삭제' })
  @UseGuards(LoggedInGuard)
  @Delete(':id')
  async deletePost(@Param('id') postId: number, @User() user: Users) {
    await this.postsService.deletePost(postId, user.id);
    return `${postId} 게시글이 삭제되었습니다.`;
  }
}
