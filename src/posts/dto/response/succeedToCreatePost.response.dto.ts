import { ApiProperty } from '@nestjs/swagger';

export class SucceedToCreatePostResponseDto {
  @ApiProperty({
    example: '(title) 게시글 작성 완료',
    description: '객체가 아닌 텍스트 내용만 출력됩니다.',
  })
  return: string;
}
