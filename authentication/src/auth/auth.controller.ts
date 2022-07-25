import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user): Promise<any> {
    const { password, email } = user;
    return this.authService.register(email, password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    const user = req.user.dataValues;
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Request() req): Promise<string | Error> {
    return this.authService.logout(req.user['sub']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@Request() req) {
    return this.authService.refresh(req.user['refresh_token']);
  }
}
