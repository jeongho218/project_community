import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
      select: ['id', 'email', 'password', 'nickname'],
    });
    console.log(email, password, user);

    if (!user) {
      return null;
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      // 위 문장은 다음의 내용과 같은 역할을 한다.
      // delete user.password;
      // 즉 변수 user에서 password의 내용을 제외한 것
      return userWithoutPassword;
    }
    return null;
  }
}
