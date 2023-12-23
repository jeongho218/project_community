import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { PostingRequestDto } from './dto/posting.request.dto';

@ApiTags('POSTS')
@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // 글 작성
  // @UseGuards(LoggedInGuard)
  @Post()
  async createPost(@Body() body: PostingRequestDto) {
    await this.postsService.createPost(body.title, body.content);
    return `'${body.title}' 게시글 작성 완료`;
  }

  // 전체 글 가져오기
  @Get()
  getAllPost() {}

  // 특정 글 가져오기
  @Get()
  getSpecificPost() {}

  // 글 수정
  // @UseGuards(LoggedInGuard)
  @Patch()
  updatePost() {}

  // 글 삭제
  // @UseGuards(LoggedInGuard)
  @Delete()
  deletePost() {}
}
