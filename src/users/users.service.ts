import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public getAll(): any[] {
    return [{id: 1, name: 'UserName'}];
  }
}
