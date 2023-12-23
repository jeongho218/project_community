import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpRequestDto } from './dto/signup.request.dto';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { User } from '../common/decorators/user.decorator';
import { Users } from './users.entity';

@UseInterceptors(UndefinedToNullInterceptor) // 이 컨트롤러에서 리턴하는 값이 undefined라면 이를 null로 변경한다.
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내 회원정보 불러오기' })
  @Get()
  getUsers(@User() user: Users) {
    return user || '로그인하지 않은 사용자입니다.';
  }

  @UseGuards(NotLoggedInGuard)
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: SignUpRequestDto) {
    await this.usersService.signUp(body.email, body.nickname, body.password);
    return `${body.nickname}님 환영합니다.`;
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@User() user: Users) {
    console.log(`${user.email} 로그인 성공!`);
    return `${user.email} 로그인 성공!`;
  }

  @ApiCookieAuth('connect.sid')
  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logOut(@Response() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('로그아웃 되었습니다.');
  }
}
