import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtInfo } from '../dto/jwt.dto';
import { UsersRepository } from 'libs/database/repositories/users.repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: jwtConstants.ignoreExpiration,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Realiza a validação do payload recebido. Função que valida o token nas rotas autenticadas.
   * @param payload Payload com informações provenientes da autenticação
   */
  async validate(payload: JwtInfo) {
    const user = await this.userRepository.findOneByIdAndType(
      payload.id,
      'ADMIN',
    );

    if (!user) throw new UnauthorizedException();

    if (payload.username !== user.username) throw new UnauthorizedException();

    if (payload.type !== user.type) throw new UnauthorizedException();

    // TODO: Verificar se o usuário está ativo

    // Configuração que indica se é permitido apenas uma sessão por usuário
    if (jwtConstants.onlyOneSession) {
      if (payload.login_token !== user.login_token)
        throw new UnauthorizedException();
    }

    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      type: payload.type,
    };
  }
}
