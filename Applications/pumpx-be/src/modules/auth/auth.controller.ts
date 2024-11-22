import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint for logging in and generating JWT token
  @Post('authenticate')
  @ApiBody({
    type: LoginDto,
    schema: {
      type: 'object',
      example: {
        username: 'luanvip',
        password: '123456',
      },
    },
  })
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  // Protected route, only accessible with a valid JWT token
  @Post('protected')
  @UseGuards(JwtAuthGuard)
  getProtected() {
    return { message: 'This is a protected route' };
  }
}
