import { ApiProperty } from '@nestjs/swagger';

export class SucceedToDeleteCommentResponseDto {
  @ApiProperty({ example: '댓글 삭제 완료' })
  return: string;
}
