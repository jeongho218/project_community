import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponseDto {
  @ApiProperty({ example: false })
  success: boolean;
  @ApiProperty({ example: 403 })
  code: number;
  @ApiProperty({ example: 'Forbidden resource' })
  data: string;
}
