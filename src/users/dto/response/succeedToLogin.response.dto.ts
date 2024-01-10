import { ApiProperty } from '@nestjs/swagger';

export class SucceedToLoginResponseDto {
  @ApiProperty({
    example: '(이메일) 로그인 성공!',
    description: '객체가 아닌 텍스트 내용만 출력됩니다.',
  })
  return: string;
}
