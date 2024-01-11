import { ApiProperty } from '@nestjs/swagger';

export class NotFoundPostResponseDto {
  @ApiProperty({ example: false })
  success: boolean;
  @ApiProperty({ example: 404 })
  code: number;
  @ApiProperty({ example: '게시글이 존재하지 않습니다.' })
  data: string;
}
