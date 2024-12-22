import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/auth-request.dto';
import { CustomResponse } from 'src/common/response';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { signInResponseDto } from './dto/auth-response.dto';

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
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.userName, signInDto.password);
  }
}
