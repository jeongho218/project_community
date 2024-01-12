import { ApiProperty } from '@nestjs/swagger';

export class CountPostResponseDto {
  @ApiProperty({
    example: '(댓글 개수)',
    description: '객체가 아닌 숫자 내용만 출력됩니다.',
  })
  return: number;
}
