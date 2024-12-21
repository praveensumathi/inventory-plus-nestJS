import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/auth-request.dto';
import { CustomResponse } from 'src/common/response';
import { ApiResponse } from '@nestjs/swagger';
import { signInResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ type: CustomResponse<signInResponseDto> })
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.userName, signInDto.password);
  }
}
