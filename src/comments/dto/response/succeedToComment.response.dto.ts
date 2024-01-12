import { ApiProperty } from '@nestjs/swagger';

export class SucceedToCommentResponseDto {
  @ApiProperty({ example: '댓글 작성 완료' })
  return: string;
}
