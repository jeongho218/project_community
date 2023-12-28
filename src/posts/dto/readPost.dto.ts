import { PickType } from '@nestjs/swagger';
import { Posts } from '../posts.entity';

export class ReadPostDto extends PickType(Posts, [
  'id',
  'userId',
  'title',
  'content',
  'imgUrl',
  'createdAt',
] as const) {}
