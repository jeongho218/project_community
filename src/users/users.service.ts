import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  // 회원가입 API
  async signUp(email: string, nickname: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    // 중복되는 이메일인 경우 에러 처리
    if (user) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }

    // 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 12);

    // DB에 저장
    await this.usersRepository.save({
      email: email,
      nickname: nickname,
      password: hashedPassword,
    });
  }
}
