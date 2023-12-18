import { Entity } from 'typeorm';

@Entity({ name: 'users' }) // DB에서 쓰일 테이블의 이름
export class Users {
  id: number;

  email: string;

  nickname: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
