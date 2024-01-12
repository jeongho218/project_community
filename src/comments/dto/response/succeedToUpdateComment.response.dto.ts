import { ApiProperty } from '@nestjs/swagger';

export class SucceedToUpdateCommentResponseDto {
  @ApiProperty({ example: '댓글 수정 완료' })
  return: string;
}
