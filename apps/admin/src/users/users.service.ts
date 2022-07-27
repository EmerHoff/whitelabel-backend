import { Injectable } from '@nestjs/common';
import { UserRepository } from 'libs/database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
