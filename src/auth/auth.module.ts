import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
