import { PickType } from '@nestjs/swagger';
import { Comments } from '../../comments.entity';

export class CommentDto extends PickType(Comments, ['comment'] as const) {}
