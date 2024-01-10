import { PickType } from '@nestjs/swagger';
import { Users } from '../../users.entity';

export class LoginRequestDto extends PickType(Users, [
  'email',
  'password',
] as const) {}
