import { PickType } from '@nestjs/swagger';
import { Users } from '../../users.entity';

export class SignUpRequestDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
] as const) {
  // DTO 내용을 users.entity에서 pickType으로 가져오도록 변경
}
