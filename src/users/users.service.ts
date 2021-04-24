import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  public async getAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  // public async getById(): User {
  //   return await this.userRepository.;
  // }

  public async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  // public async update(user: UpdateUserDto): User {
  //   return await this.userRepository.;
  // }

  // public async delete(id: number): User {
  //   return await this.userRepository.;
  // }
}
