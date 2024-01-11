import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Comments } from '../comments/comments.entity';
import { Likes } from '../likes/likes.entity';

@Entity({ name: 'Posts' })
export class Posts {
  @ApiProperty({ example: 1, description: '게시글 아이디' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '게시글 제목',
    description: '게시글의 제목 입력',
    required: true,
  })
  @Column({ type: 'varchar' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '게시글 내용',
    description: '게시글의 내용 입력',
    required: true,
  })
  @Column({ type: 'varchar' })
  content: string;

  @ApiProperty({
    example: '게시글에 들어갈 이미지',
    description: '게시글에 들어갈 이미지 입력',
  })
  @Column({ type: 'varchar', nullable: true })
  imgUrl: string;

  @ApiProperty({ example: '2024-01-11T09:36:24.328Z' })
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // Relation

  @ManyToOne(() => Users, (user: Users) => user.post, {
    onDelete: 'CASCADE',
  })
  // 외래키 정보
  @JoinColumn([
    {
      referencedColumnName: 'id',
      name: 'userId',
    },
  ])
  user: Users[];

  @OneToMany(() => Comments, (comment: Comments) => comment.post, {
    cascade: true,
  })
  comment: Comments[];

  @OneToMany(() => Likes, (like: Likes) => like.post, {
    cascade: true,
  })
  like: Likes[];
}
