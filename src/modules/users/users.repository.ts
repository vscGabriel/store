import { Injectable } from '@nestjs/common';
import { UserEntity } from './users.entity';

@Injectable()
export class UserRepository {
  constructor() {}
  private user: UserEntity[] = [];

  private findById(id: string) {
    const possibleUser = this.user.find((user) => user.id === id);

    if (!possibleUser) {
      throw new Error('User not exist');
    }

    return possibleUser;
  }

  async save(user: UserEntity) {
    this.user.push(user);
  }

  async findAll() {
    return this.user;
  }

  async existEmail(email: string) {
    const possibleUser = this.user.find((user) => user.email == email);
    return possibleUser !== undefined;
  }

  async update(id: string, atualizationData: Partial<UserEntity>) {
    const user = this.findById(id);
    Object.entries(atualizationData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async delete(id: string) {
    const user = this.findById(id);

    this.user = this.user.filter((userSave) => userSave.id !== id);

    return user;
  }
}
