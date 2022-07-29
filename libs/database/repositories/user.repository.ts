import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'libs/utils/utils';
import { Repository } from 'typeorm';
import { IUserCreate, IUserFindAll } from '../interfaces/user.interface';
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

  async findAll(userFindAll: IUserFindAll) {
    const userBuilder = this.userRepository.createQueryBuilder('user');

    if (userFindAll.username) {
      userBuilder.andWhere('user.username ILIKE :username', {
        username: `%${userFindAll.username}%`,
      });
    }

    if (userFindAll.email) {
      userBuilder.andWhere('user.email ILIKE :email', {
        email: `%${userFindAll.email}%`,
      });
    }

    if (userFindAll.complete_name) {
      userBuilder.andWhere(
        `CONCAT(user.name, ' ', user.last_name) ILIKE :complete_name`,
        {
          complete_name: `%${userFindAll.complete_name}%`,
        },
      );
    }

    if (userFindAll.telephone) {
      userBuilder.andWhere('user.telephone ILIKE :telephone', {
        telephone: `%${userFindAll.telephone}%`,
      });
    }

    if (userFindAll.type) {
      userBuilder.andWhere('user.type = :type', {
        type: userFindAll.type,
      });
    }

    if (userFindAll.status) {
      userBuilder.andWhere('user.status = :status', {
        status: userFindAll.status,
      });
    }

    const count = await userBuilder.getCount();
    const users = await userBuilder.getMany();

    return { count, users };
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
