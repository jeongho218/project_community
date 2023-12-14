import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async signUp() {
    const input = await this.usersService.signUp();
  }
}
