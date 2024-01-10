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
import { SignUpRequestDto } from './dto/request/signup.request.dto';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserDto } from './dto/response/getUser.response.dto';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { User } from '../common/decorators/user.decorator';
import { Users } from './users.entity';
import { FailedToLoginResponseDto } from './dto/response/failedToLogin.response.dto';
import { SucceedToLoginResponseDto } from './dto/response/succeedToLogin.response.dto';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { NotLoggedInUserResponseDto } from './dto/response/NotLoggedIntUser.response.dto';
import { SucceedToSignUpResponseDto } from './dto/response/succeedToSignup.response.dto';
import { FailedToSignUpResponseDto } from './dto/response/failedToSignUp.response.dto';
import { ForbiddenResponseDto } from '../common/dto/403Forbidden.response.dto';
import { SucceedToLogoutResponseDto } from './dto/response/succeedToLogout.response.dto';
import { FailedToSignUpWithWrongBodyResponseDto } from './dto/response/failedToSignUpWithWrongBody.response.dto';

@UseInterceptors(UndefinedToNullInterceptor) // 이 컨트롤러에서 리턴하는 값이 undefined라면 이를 null로 변경한다.
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // 회원 정보 불러오기
  @ApiResponse({
    status: 200,
    description: '현재 로그인한 사용자의 내용을 반환',
    type: GetUserDto,
  })
  @ApiResponse({
    status: 201,
    description: '로그인하지 않았을 경우, 이 반환도 HTTP 코드 200입니다.',
    type: NotLoggedInUserResponseDto,
  })
  @ApiOperation({
    summary: '내 회원정보 불러오기',
    description: `현재 로그인한 사용자의 정보를 불러옵니다. 로그인하지 않은 사용자일 경우 "로그인 하지 않은 사용자입니다." 텍스트가 출력됩니다.`,
  })
  @Get()
  getUsers(@User() user: Users) {
    return user || '로그인하지 않은 사용자입니다.';
  }

  // 회원 가입
  @UseGuards(NotLoggedInGuard)
  @ApiOperation({
    summary: '회원가입',
    description:
      '회원가입을 진행합니다. 가드가 설정되어 있어 로그인 상태라면 사용할 수 없습니다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공 시 반환되는 내용',
    type: SucceedToSignUpResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      '회원가입 실패 시 반환되는 내용, 잘못된 Body가 입력되었을 경우 400 에러가 반환됩니다.',
    type: FailedToSignUpWithWrongBodyResponseDto,
  })
  @ApiResponse({
    status: 401,
    description:
      '회원가입 실패 시 반환되는 내용, 중복되는 이메일일 경우 401 에러가 반환됩니다.',
    type: FailedToSignUpResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      '이미 로그인 한 상태에서 회원가입을 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @Post()
  async signUp(@Body() body: SignUpRequestDto) {
    await this.usersService.signUp(body.email, body.nickname, body.password);
    return `${body.nickname}님 환영합니다.`;
  }

  // 로그인
  @ApiResponse({
    status: 201,
    description: '로그인 성공 시 반환되는 내용',
    type: SucceedToLoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패 시 반환되는 내용',
    type: FailedToLoginResponseDto,
  })
  @ApiOperation({
    summary: '로그인',
    description: '로그인을 진행합니다.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@Body() body: LoginRequestDto) {
    console.log(`${body.email} 로그인 성공!`);
    return `${body.email} 로그인 성공!`;
  }

  // 로그아웃
  @ApiCookieAuth('connect.sid')
  @UseGuards(LoggedInGuard)
  @ApiResponse({
    status: 201,
    description: '로그아웃 성공 시 반환되는 내용',
    type: SucceedToLogoutResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      '로그인하지 않은 상태에서 로그아웃을 시도했을 경우 반환되는 내용',
    type: ForbiddenResponseDto,
  })
  @ApiOperation({
    summary: '로그아웃',
    description:
      '로그아웃을 진행합니다. 가드가 설정되어 있어 로그인 상태가 아니라면 사용할 수 없습니다.',
  })
  @Post('logout')
  async logOut(@Response() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('로그아웃 되었습니다.');
  }
}
