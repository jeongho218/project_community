import { ApiProperty } from '@nestjs/swagger';

export class FailedToLoginResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 401 })
  code: number;

  @ApiProperty({ example: 'Unauthorized' })
  data: string;
}
