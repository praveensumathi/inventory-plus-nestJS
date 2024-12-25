import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/auth-request.dto';
import { CustomResponse } from 'src/common/response';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiSecurity,
  getSchemaPath,
} from '@nestjs/swagger';
import { signInResponseDto, UserDto } from './dto/auth-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiBearerAuth()
@Controller('auth')
@ApiExtraModels(CustomResponse, signInResponseDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      allOf: [
        { $ref: getSchemaPath(CustomResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(signInResponseDto) },
          },
        },
      ],
    },
  })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() signInDto: signInDto) {
    var loggedInUser: UserDto = req.user;
    return this.authService.login(loggedInUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
