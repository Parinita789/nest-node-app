import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/request/createUserRequest.dto';
import { UserUpdateRequestDto } from './dto/request/userUpdateRequest.dto';
import { Logger } from '../../utility/logger';

class ApiServiceMock {

  createUser(dto: UserRequestDto) {
    return [];
  }

  getUserById(id: string) {
    return [];
  }

  updateUserById(id: string, dto: UserUpdateRequestDto) {
    return [];
  }

  deleteUser(id: string) {
    return [];
  }
}

describe("User Service Test", () => {

  let userService: UserService;
  const userId = 1;

  beforeAll(async () => {
    const ApiServiceProvider = {
        provide: UserService,
        useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ApiServiceProvider,
        Logger
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  })

  it('userService - should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should call createUser method with expected params', async () => {
    const createUserSpy = jest.spyOn(userService, 'createUser');
    const dto = new UserRequestDto();
    await userService.createUser(dto);
    expect(createUserSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getUserById method with expected param', async () => {
    const findOneUserSpy = jest.spyOn(userService, 'getUserById');
    await userService.getUserById(userId);
    expect(findOneUserSpy).toHaveBeenCalledWith(userId);
  });

  it('should call updateUser method with expected params', async () => {
    const updateUserSpy = jest.spyOn(userService, 'updateUserById');
    const dto = new UserUpdateRequestDto();
    await userService.updateUserById(userId, dto);
    expect(updateUserSpy).toHaveBeenCalledWith(userId, dto);
  });

  it('should call deleteUser method with expected param', async () => {
    const deleteUserSpy = jest.spyOn(userService, 'deleteUser');
    await userService.deleteUser(userId);
    expect(deleteUserSpy).toHaveBeenCalledWith(userId);
  });
})