import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPass = await bcrypt.hash(password, 10);

    const createdUser = await this.userService.create({
      email,
      password: hashedPass,
    });

    const tokens = this.generateTokens(createdUser);

    await this.userModel.update(
      {
        refresh_token: tokens.refresh_token,
      },
      {
        where: { id: createdUser.getDataValue('id') },
      },
    );

    return { access_token: tokens.access_token };
  }

  generateTokens(payload) {
    const timeForAccessToken = '15m';
    const timeForRefreshToken = '30m';

    const access_token = this.jwtService.sign(
      {
        email: payload.email,
        sub: payload.id,
      },
      { secret: process.env.ACCESS_SECRET, expiresIn: timeForAccessToken },
    );
    const refresh_token = this.jwtService.sign(
      { sub: payload.id },
      { secret: process.env.REFRESH_SECRET, expiresIn: timeForRefreshToken },
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id };

    const tokens = this.generateTokens(payload);

    await this.userModel.update(
      { refresh_token: tokens.refresh_token },
      {
        where: { id: user.id },
      },
    );
    return { access_token: tokens.access_token };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (!user) throw new UnauthorizedException();
    const hash = await bcrypt.compare(pass, user.getDataValue('password'));

    if (user && hash) {
      const { password, ...secureUser } = user;
      return secureUser;
    }

    return null;
  }

  async logout(userId: number): Promise<string | Error> {
    const user = await this.userModel.findOne({ where: { id: userId } });

    if (!user.getDataValue('refresh_token')) {
      throw new UnauthorizedException();
    }

    const result = await this.userModel.update(
      { refresh_token: null },
      { where: { id: userId } },
    );

    if (!result[0]) {
      throw new UnauthorizedException();
    }
    return 'You logged out';
  }

  async refresh(refresh_token: string) {
    if (!refresh_token) throw new UnauthorizedException();

    const user = await this.userModel.findOne({ where: { refresh_token } });

    const tokens = this.generateTokens(user);
    console.log(user);
    await this.userModel.update(
      { refresh_token: tokens.refresh_token },
      { where: { id: user.id } },
    );

    return {
      access_token: tokens.access_token,
    };
  }
}
