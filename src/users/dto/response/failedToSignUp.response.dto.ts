import { ApiProperty } from '@nestjs/swagger';

export class FailedToSignUpResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 401 })
  code: number;

  @ApiProperty({ example: '이미 존재하는 이메일입니다.' })
  data: string;
}
