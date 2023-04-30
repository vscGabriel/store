import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserEntity } from './users.entity';
import { v4 as uuid } from 'uuid';
import { UserListDto } from './dto/userList.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
@Controller('/users')
export class UsersController {
  constructor(private userRepo: UserRepository) {}
  //   private userRepo = new UserRepository();

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.name = userData.name;
    userEntity.password = userData.password;
    userEntity.id = uuid();
    this.userRepo.save(userEntity);
    return {
      user: new UserListDto(userEntity.id, userEntity.name),
      message: 'created user sucessfuly',
    };
  }

  @Get()
  async findAll() {
    const usersSave = await this.userRepo.findAll();

    const usersList = usersSave.map(
      (user) => new UserListDto(user.id, user.name),
    );
    return usersList;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDto) {
    const updatedUser = await this.userRepo.update(id, newData);

    return {
      user: updatedUser,
      message: 'Updated user successfuly',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userRepo.delete(id);

    return {
      user: deletedUser,
      message: 'Deleted user successfuly',
    };
  }
}
