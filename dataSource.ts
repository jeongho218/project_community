import dotenv from 'dotenv';
import { Users } from './src/users/users.entity';
import { DataSource } from 'typeorm';
import { Posts } from './src/posts/posts.entity';
import { Comments } from './src/comments/comments.entity';
import { Likes } from './src/likes/likes.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Posts, Comments, Likes],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4_general_ci',
  synchronize: false, // 이건 false 고정, 테이블 생성은 app.module.ts에서
  logging: true,
});

export default dataSource;
