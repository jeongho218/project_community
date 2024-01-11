import { ApiProperty, PickType } from '@nestjs/swagger';
import { Posts } from 'src/posts/posts.entity';

export class GetPostResponseDto extends PickType(Posts, [
  'id',
  'userId', // 외래키여서 그런가 PickType해도 안나오네
  'title',
  'content',
  'createdAt',
] as const) {
  @ApiProperty({ example: 1, description: '게시글 작성자의 userId' })
  userId: number;

  @ApiProperty({
    example: `{
    "nickname": "test"
}`,
  })
  user: object;
}
