import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { AtJwtStrategy } from './strategies/at-jwt.strategy';
import { RtJwtStrategy } from './strategies/rt-jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService, LocalStrategy, AtJwtStrategy, RtJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
