import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/role-auth.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Get('')
  public getUsers() {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post('role')
  public addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post('ban')
  public banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post('')
  public createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post('/:id')
  public updateUser(
    @Param('id') userId: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.usersService.update(Number(userId), userDto);
  }
}
