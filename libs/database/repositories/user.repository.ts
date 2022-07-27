import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'libs/utils/utils';
import { Repository } from 'typeorm';
import { IUserCreate } from '../interfaces/user.interface';
import { User } from '../models/user.model';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneById(id: number | string) {
    return this.userRepository.findOne(id);
  }

  findOneByIdAndType(id: number | string, type: string) {
    return this.userRepository.findOne({
      where: { id, type },
    });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username, status: UserStatus.ACTIVE },
    });
  }

  findOneByUsernameAndType(username: string, type: string) {
    return this.userRepository.findOne({
      where: { username, type, status: UserStatus.ACTIVE },
    });
  }

  findAll() {
    return this.userRepository.find({
      where: { status: UserStatus.ACTIVE },
    });
  }

  async create(userInfo: IUserCreate) {
    const user = new User();
    Object.assign(user, userInfo);

    await this.userRepository.save(user);
  }

  async update(user: User) {
    await this.userRepository.update(user.id, user);
  }
}
