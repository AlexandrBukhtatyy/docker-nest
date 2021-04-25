import { Column, DataType, Model, Table, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/role.model";
import { UserRoles } from "../roles/user-roles.model";

export interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'test@mail.ru', description: 'Электронная почта'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({example: '123456', description: 'Пароль пользователя'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({example: 'true', description: 'Забанен пользователь или нет'})
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({example: 'Нецензурная брань', description: 'Причина бана'})
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  bannReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}