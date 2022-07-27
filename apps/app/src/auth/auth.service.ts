import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'libs/database/models/user.model';
import { UserRepository } from 'libs/database/repositories/user.repository';
import { JwtInfo } from './dto/jwt.dto';
import * as md5 from 'md5';
import { UserType } from 'libs/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOneByUsernameAndType(
      username,
      UserType.APP,
    );

    if (user && user.password === md5(password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    // Usuário não encontrado ou senha não confere
    return null;
  }

  async login(user: User) {
    const login_token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    user.login_token = login_token;
    await this.userRepository.update(user);

    const payload: JwtInfo = {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      ip: 0,
      login_token,
      type: UserType.APP,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
