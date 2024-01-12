import { ApiProperty } from '@nestjs/swagger';

export class AlreadyLikedPostResponseDto {
  @ApiProperty({ example: 'false' })
  success: boolean;
  @ApiProperty({ example: '409' })
  code: number;
  @ApiProperty({ example: '이미 좋아요한 게시글입니다.' })
  data: string;
}
