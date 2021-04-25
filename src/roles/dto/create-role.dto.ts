import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({example: 'ADMIN', description: 'Ключ роли'})
  readonly role: string;

  @ApiProperty({example: 'Роль администратора', description: 'Описание роли'})
  readonly description: string;
}