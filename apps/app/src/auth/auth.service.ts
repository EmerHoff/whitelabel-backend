import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'libs/database/models/user.model';
import { UsersRepository } from 'libs/database/repositories/users.repositories';
import { JwtInfo } from './dto/jwt.dto';
import * as md5 from 'md5';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOneByUsernameAndType(
      username,
      'APP',
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
    await this.usersRepository.update(user);

    const payload: JwtInfo = {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      ip: 0,
      login_token,
      type: 'APP',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
