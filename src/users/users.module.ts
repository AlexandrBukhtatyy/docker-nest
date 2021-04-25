import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Role } from "../roles/role.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
