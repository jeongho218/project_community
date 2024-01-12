import { PickType, ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.entity';

export class GetCommentResponseDto extends PickType(Comments, [
  'id',
  'comment',
  'createdAt',
] as const) {
  @ApiProperty({ example: 1, description: '게시글의 id' })
  postId: number;

  @ApiProperty({ example: 1, description: '댓글 작성자의 userId' })
  userId: number;

  // comment - post - users로 넘어가 댓글 작성자의 닉테임을 가져오고 싶었으나 실패함
  // @ApiProperty({
  //   example: `{
  //   "nickname": "test"
  //   }`,
  // })
  // user: object;
}
