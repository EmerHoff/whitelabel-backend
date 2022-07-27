import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/database/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserRepository } from 'libs/database/repositories/user.repository';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
