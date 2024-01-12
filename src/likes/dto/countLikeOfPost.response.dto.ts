import { ApiProperty } from '@nestjs/swagger';

export class CountLikeOfPostResponseDto {
  @ApiProperty({ example: 1 })
  return: number;
}
