import { PickType } from '@nestjs/swagger';
import { Posts } from '../../posts.entity';

export class PostingRequestDto extends PickType(Posts, [
  'title',
  'content',
] as const) {}
