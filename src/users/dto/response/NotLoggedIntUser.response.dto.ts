import { ApiProperty } from '@nestjs/swagger';

export class NotLoggedInUserResponseDto {
  @ApiProperty({
    example: '로그인하지 않은 사용자입니다.',
    description: '객체가 아닌 텍스트 내용만 출력됩니다.',
  })
  return: string;
}
