import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CONSTANTS } from '../../constants/constants';

@Injectable()
export class UserService {
  constructor(
    public readonly userRepository: UserRepository
  ) {}

  async createUser(user: User): Promise<number> {
    return this.userRepository.createUser(user);
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS);
  }

  public async findOneUser(findObject: object): Promise<User> {
    return this.userRepository.findOneUser(findObject);
  }

  public async getUserById(userId: number): Promise<User> {
    return this.userRepository.getUserById(userId)
  }

  public async updateUserById(userId: number, fieldsToUpdate: object): Promise<User> {
    return this.userRepository.updateUserById(userId, fieldsToUpdate)
  }

  public async deleteUser(userId: number): Promise<void> {
    return this.userRepository.deleteUserById(userId);
  }
}
