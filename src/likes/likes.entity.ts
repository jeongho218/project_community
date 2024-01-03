import { ApiProperty } from '@nestjs/swagger';
import { Posts } from '../posts/posts.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'Likes' })
export class Likes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({ example: 1, description: '게시글 아이디' })
  @Column({ type: 'int' })
  postId: number;

  @Column({ type: 'int' })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // Relation
  @ManyToOne(() => Posts, (post: Posts) => post.like, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', name: 'postId' }])
  post: Posts[];
}
