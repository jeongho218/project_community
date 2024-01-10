import { ApiProperty, PickType } from '@nestjs/swagger';
import { SignUpRequestDto } from 'src/users/dto/request/signup.request.dto';
import { Users } from '../../users.entity';

// response, 사용자에게 반환되는 내용의 형식을 지정하는 dto
// users 모듈 외 다른 곳에서도 쓰일 예정이라 common/dto로 뺌
// 현재 getUsers에서 쓰이는 중
export class GetUserDto extends PickType(Users, [
  'id',
  'email',
  'nickname',
] as const) {}
