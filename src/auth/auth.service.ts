import { Body, HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt  from "bcryptjs";
import { User } from "../users/user.model";

@Injectable()
export class AuthService {
  constructor(
    protected userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(dto: CreateUserDto) {

  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({...dto, password: hashPassword});
    const token = this.generateToken(user);
    console.log('token: ', token);
    return token;
  }

  async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {
      token: this.jwtService.sign(payload)
    };
  }
}
