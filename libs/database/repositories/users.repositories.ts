import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneById(id: number | string) {
    return this.userRepository.findOne(id);
  }

  findOneByIdAndType(id: number | string, type: string) {
    return this.userRepository.findOne({
      where: { id, type, status: 'ACTIVE' },
    });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username, status: 'ACTIVE' },
    });
  }

  findOneByUsernameAndType(username: string, type: string) {
    return this.userRepository.findOne({
      where: { username, type, status: 'ACTIVE' },
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  async update(user: User) {
    await this.userRepository.update(user.id, user);
  }
}
