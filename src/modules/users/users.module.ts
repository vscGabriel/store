import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UniqueEmailValidator } from './validation/unique-email.validator';

@Module({
  controllers: [UsersController],
  providers: [UserRepository, UniqueEmailValidator],
})
export class UsersModule {}
