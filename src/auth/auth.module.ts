import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-strategy';
import { LocalSerializer } from './local.serializer';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    // JWT로 변경 시 { session: false }
    // 인증 절차: local-auth.guard.ts -> local.strategy.ts -> auth.service.ts
    // -> local.strategy.ts -> local.serializer.ts
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
