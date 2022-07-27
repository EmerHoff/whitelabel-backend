import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtInfo } from '../dto/jwt.dto';
import { UserRepository } from 'libs/database/repositories/user.repository';
import { UserStatus, UserType } from 'libs/utils/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
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
      UserType.APP,
    );

    if (!user) throw new UnauthorizedException();

    if (payload.username !== user.username) throw new UnauthorizedException();

    if (payload.type !== user.type) throw new UnauthorizedException();

    if (user.status !== UserStatus.ACTIVE) throw new UnauthorizedException();

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
