import { HttpException, Injectable } from '@nestjs/common';
import { IUserCreate } from 'libs/database/interfaces/user.interface';
import { UserRepository } from 'libs/database/repositories/user.repository';
import { UserStatus, UserType } from 'libs/utils/utils';
import * as md5 from 'md5';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hasUser = await this.userRepository.findOneByUsernameAndType(
      createUserDto.username,
      createUserDto.type,
    );

    if (hasUser) {
      throw new HttpException(
        'Já existe um cadastro para esse nome de usuário',
        400,
      );
    }

    const userInfo: IUserCreate = {
      username: createUserDto.username,
      password: md5(createUserDto.password),
      email: createUserDto.email,
      name: createUserDto.name,
      last_name: createUserDto.last_name,
      telephone: createUserDto.telephone,
      type: createUserDto.type,
      status: UserStatus.ACTIVE,
    };

    await this.userRepository.create(userInfo);

    return { success: true, message: 'User created successfully' };
  }

  async findAll(findUserDto: FindUserDto) {
    return await this.userRepository.findAll(findUserDto);
  }

  async findOne(id: number) {
    return await this.userRepository.findOneById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    // Remove o campo de username e type pois eles não podem ser alterados
    delete updateUserDto.username;
    delete updateUserDto.type;

    Object.assign(user, updateUserDto);

    await this.userRepository.update(user);

    return { success: true, message: 'User updated successfully' };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    user.status = UserStatus.INACTIVE;

    await this.userRepository.update(user);

    return { success: true, message: 'User inactivated successfully' };
  }
}
