import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'test@email.com',
    description: '이메일 입력',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'testUser',
    description: '닉네임 입력',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'test1234!@#$',
    description: '패스워드 입력',
    required: true,
  })
  public password: string;
}
