import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
