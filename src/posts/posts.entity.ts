import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Posts' })
export class Posts {
  @ApiProperty({ example: 1, description: '게시글 아이디' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  @Column()
  content: string;

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
}
