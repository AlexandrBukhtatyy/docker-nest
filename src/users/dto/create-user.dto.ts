import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'test@mail.ru', description: 'Электронная почта'})
  readonly email: string;
  @ApiProperty({example: '123456', description: 'Пароль пользователя'})
  readonly password: string;
}