import { ApiProperty } from '@nestjs/swagger';

export class FailedToCommentResponseDto {
  @ApiProperty({ example: 'false' })
  success: boolean;

  @ApiProperty({ example: '400' })
  code: number;

  @ApiProperty({
    example: `"댓글 내용을 입력해주세요.", "comment must be a string"`,
  })
  data: string;
}
