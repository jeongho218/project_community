import { ApiProperty } from '@nestjs/swagger';
import { SignUpRequestDto } from 'src/users/dto/signup.request.dto';

// response, 사용자에게 반환되는 내용의 형식을 지정하는 dto
// users 모듈 외 다른 곳에서도 쓰일 예정이라 common/dto로 뺌
export class UserDto extends SignUpRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}
