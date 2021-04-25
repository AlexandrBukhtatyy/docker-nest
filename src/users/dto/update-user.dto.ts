export class UpdateUserDto {
  email: string;
  password: string;
  banned: boolean;
  bannReason: string;
}