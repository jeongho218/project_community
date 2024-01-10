import { ApiProperty } from '@nestjs/swagger';

export class SucceedToSignUpResponseDto {
  @ApiProperty({
    example: '(nickname)님 환영합니다.',
    description: '객체가 아닌 텍스트 내용만 출력됩니다.',
  })
  return: string;
}
