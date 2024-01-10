import { ApiProperty } from '@nestjs/swagger';

export class FailedToSignUpWithWrongBodyResponseDto {
  @ApiProperty({ example: 'false' })
  success: boolean;

  @ApiProperty({ example: '400' })
  code: number;

  @ApiProperty({
    example: `"email must be an email",
    "nickname should not be empty",
    "nickname must be a string",
    "password should not be empty",
    "password must be a string"`,
  })
  data: string;
}
