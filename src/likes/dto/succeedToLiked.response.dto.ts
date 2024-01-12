import { ApiProperty } from '@nestjs/swagger';

export class SucceedToLikedResponseDto {
  @ApiProperty({ example: '좋아요 등록 완료' })
  return: string;
}
