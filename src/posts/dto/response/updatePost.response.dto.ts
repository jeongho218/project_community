import { ApiProperty } from '@nestjs/swagger';

export class UpdatedPostResponseDto {
  @ApiProperty({
    example: '(id) 게시글이 수정되었습니다.',
    description: '객체가 아닌 텍스트 내용만 출력됩니다.',
  })
  return: string;
}
