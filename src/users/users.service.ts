import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  public async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  // public async getById(): User {
  //   return await this.userRepository.;
  // }

  public async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByName('USER');
    await user.$set('roles', [role.id]);
    return user;
  }

  public async update(id: number, dto: UpdateUserDto) {
    const [user] = await this.userRepository.update(dto, {
      where: { id: id },
    });
    return user;
  }

  // public async delete(id: number): User {
  //   return await this.userRepository.;
  // }
}
