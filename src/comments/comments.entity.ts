import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'Comments' })
export class Comments {
  @ApiProperty({ example: 1, description: '댓글 아이디' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  // 게시글 아이디
  //   @Column({ type: 'int' })
  //   postId: number;

  // 작성자 아이디
  //   @Column({ type: 'int' })
  //   userId: number;

  @IsString()
  @IsNotEmpty({ message: '댓글 내용을 입력해주세요.' })
  @Column({ type: 'varchar' })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
