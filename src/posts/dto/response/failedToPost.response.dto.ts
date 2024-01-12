import { ApiProperty } from '@nestjs/swagger';

export class FailedToPostResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: '400' })
  code: number;

  @ApiProperty({
    example: `"title should not be empty", "title must be a string", "content should not be empty", "content must be a string"`,
  })
  data: string;
}
