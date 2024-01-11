import { PartialType } from '@nestjs/swagger';
import { PostingRequestDto } from './posting.request.dto';

export class UpdatePostRequestDto extends PartialType(PostingRequestDto) {}
