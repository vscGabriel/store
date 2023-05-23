import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UserListDto } from './dto/userList.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async userList() {
    const users = await this.userRepo.find();
    const usersList = users.map((user) => new UserListDto(user.id, user.name));
    return usersList;
  }

  async createUser(user: UserEntity) {
    await this.userRepo.save(user);
  }

  async updateUser(id: string, user: UpdateUserDto) {
    await this.userRepo.update(id, user);
  }

  async deleteUser(id: string) {
    await this.userRepo.delete(id);
  }
}
