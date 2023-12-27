import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  // 회원가입 api
  async signUp(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // DB 연결
    await queryRunner.startTransaction(); // 트랜잭션 시작

    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email: email } });

    // 중복되는 이메일인 경우 에러 처리
    if (user) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }

    // 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      await queryRunner.manager
        .getRepository(Users)
        .save({ email: email, nickname: nickname, password: hashedPassword });

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction(); // 트랜잭션 실행 전으로 롤백
      throw error;
    } finally {
      await queryRunner.release(); // DB 연결 종료
    }

    // before
    // DB에 저장
    // await this.usersRepository.save({
    //   email: email,
    //   nickname: nickname,
    //   password: hashedPassword,
    // });
  }
}
