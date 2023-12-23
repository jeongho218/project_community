import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'Users' }) // DB에서 쓰일 테이블의 이름
export class Users {
  @ApiProperty({ example: 1, description: '사용자 아이디' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsEmail()
  @ApiProperty({
    example: 'test@email.com',
    description: '이메일 입력',
    required: true,
  })
  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'testUser',
    description: '닉네임 입력',
    required: true,
  })
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test1234!@#$',
    description: '패스워드 입력',
    required: true,
  })
  @Column('varchar', { name: 'password', length: 100, select: false })
  /** select:false 옵션은 'select * from users' 쿼리의 결과에 포함되지 않는다는 설정이다
   * 'select password from users'와 같이 컬럼명을 명시적으로 적어주어야만 내용이 출력된다.
   * default는 true이다. */
  password: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
