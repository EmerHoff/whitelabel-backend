import { HttpException, Injectable } from '@nestjs/common';
import { differenceInMinutes } from 'date-fns';
import { IUserCreate } from 'libs/database/interfaces/user.interface';
import { EmailLogRepository } from 'libs/database/repositories/email_log.repository';
import { UserRepository } from 'libs/database/repositories/user.repository';
import {
  EmailLogType,
  hidingEmail,
  UserStatus,
  UserType,
} from 'libs/utils/utils';
import * as md5 from 'md5';
import { JwtInfo } from '../auth/dto/jwt.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailLogRepository: EmailLogRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hasUser = await this.userRepository.findOneByUsernameAndType(
      createUserDto.username,
      UserType.APP,
    );

    if (hasUser) {
      throw new HttpException('Já existe um cadastro para esse usuário', 400);
    }

    const userInfo: IUserCreate = {
      username: createUserDto.username,
      password: md5(createUserDto.password),
      email: createUserDto.email,
      name: createUserDto.name,
      last_name: createUserDto.last_name,
      telephone: createUserDto.telephone,
      device_token: createUserDto.device_token,
      type: UserType.APP,
      status: UserStatus.ACTIVE,
    };

    await this.userRepository.create(userInfo);

    return { success: true, message: 'User created successfully' };
  }

  async findOne(userInfo: JwtInfo) {
    const user = await this.userRepository.findOneByIdAndType(
      userInfo.id,
      UserType.APP,
    );

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async update(userInfo: JwtInfo, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneByIdAndType(
      userInfo.id,
      UserType.APP,
    );

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    // Remove o campo de username e password pois eles não serão alterados nesse momento
    delete updateUserDto.username;
    delete updateUserDto.password;

    Object.assign(user, updateUserDto);

    await this.userRepository.update(user);

    return { success: true, message: 'User updated successfully' };
  }

  async deleteUserAccount(userInfo: JwtInfo) {
    const user = await this.userRepository.findOneByIdAndType(
      userInfo.id,
      UserType.APP,
    );

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    user.status = UserStatus.DELETED;
    await this.userRepository.update(user);

    return { success: true, message: 'User account deleted successfully' };
  }

  async requestResetPassword({
    username,
    confirmation_email,
  }: RequestResetPasswordDto) {
    const user = await this.userRepository.findOneByUsernameAndType(
      username,
      UserType.APP,
    );

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404);
    }

    if (user.email !== confirmation_email) {
      throw new HttpException(
        'O email informado é diferente do email da sua conta',
        400,
      );
    }

    const latestLog = await this.emailLogRepository.findLatestByUserId(
      user.id,
      EmailLogType.RESET_PASSWORD,
    );

    // Não permite solicitar um novo código caso outro já tenha sido enviado recentemente
    if (
      latestLog &&
      differenceInMinutes(new Date(), new Date(latestLog.created_at)) < 5
    ) {
      throw new HttpException('Tente solicitar um novo código mais tarde', 400);
    }

    const token = ('' + Math.random()).substring(2, 7);

    //TODO: Enviar o email com o código
    console.log('TOKEN SENHA: ' + token);

    // Registrar log da nova solicitação de senha
    await this.emailLogRepository.create({
      user_id: user,
      content: token,
      type: EmailLogType.RESET_PASSWORD,
    });

    return {
      success: true,
      email: hidingEmail(user.email),
    };
  }

  async resetPassword({ token, username, password }: ResetPasswordDto) {
    const user = await this.userRepository.findOneByUsernameAndType(
      username,
      UserType.APP,
    );

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404);
    }

    const emailLog = await this.emailLogRepository.findLatestByUserId(
      user.id,
      EmailLogType.RESET_PASSWORD,
    );

    if (!emailLog) {
      throw new HttpException(
        'Não encontramos uma solicitação de alteração de senha',
        400,
      );
    }

    if (emailLog.content !== token) {
      throw new HttpException(
        'O código de validação informado não confere',
        400,
      );
    }

    user.password = md5(password);

    await this.userRepository.update(user);

    return { success: true, message: 'Password reset successfully' };
  }
}
