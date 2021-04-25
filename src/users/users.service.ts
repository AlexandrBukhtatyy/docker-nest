import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  // async getById(): User {
  //   return await this.userRepository.;
  // }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const [user] = await this.userRepository.update(dto, {
      where: { id: id },
    });
    return user;
  }

  // async delete(id: number): User {
  //   return await this.userRepository.;
  // }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
