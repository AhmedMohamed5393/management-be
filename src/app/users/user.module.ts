import { Service } from './service';
import { Module } from '@nestjs/common';
import { UserService } from './services/userService';
@Module({ imports: [], controllers: [Service], providers: [UserService] })
export class UserModule {}
