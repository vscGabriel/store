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
import { UserService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(
    private userRepo: UserRepository,
    private userService: UserService,
  ) {}
  //   private userRepo = new UserRepository();

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.name = userData.name;
    userEntity.password = userData.password;
    userEntity.id = uuid();
    this.userService.createUser(userEntity);
    return {
      user: new UserListDto(userEntity.id, userEntity.name),
      message: 'created user sucessfuly',
    };
  }

  @Get()
  async findAll() {
    const usersSave = await this.userService.userList();

    return usersSave;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, newData);

    return {
      user: updatedUser,
      message: 'Updated user successfuly',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);

    return {
      user: deletedUser,
      message: 'Deleted user successfuly',
    };
  }
}
