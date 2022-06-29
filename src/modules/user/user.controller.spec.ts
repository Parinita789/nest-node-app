import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/request/createUserRequest.dto';
import { UserUpdateRequestDto } from './dto/request/userUpdateRequest.dto';
import { Logger } from '../../utility/logger';

describe("User Controller Unit Tests", () => {
  let userController: UserController;
  let spyService: UserService;
  const userId = 1;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        createUser: jest.fn(() => {}),
        getUserById: jest.fn(() => {}),
        updateUserFieldsById: jest.fn(() => { }),
        deleteUser: jest.fn(() => {})
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [ UserService, ApiServiceProvider, Logger],
    }).compile();

    userController = app.get<UserController>(UserController);
    spyService = app.get<UserService>(UserService);
  })

  it("calling createUser method", async () => {
    const dto = new UserRequestDto();
    const result = await userController.createUser(dto)
    expect(result).not.toEqual(null);
    expect(spyService.createUser).toHaveBeenCalled();
    expect(spyService.createUser).toHaveBeenCalledWith(dto);
  })

  it("calling getUserById method", async () => {
    await userController.getUserById(userId)
    expect(spyService.getUserById).toHaveBeenCalled();
    expect(spyService.getUserById).toHaveBeenCalledWith(userId);
  })

  it("calling updateUserById method", async () => {
    const dto = new UserUpdateRequestDto();
    await userController.updateUserFieldsById(userId, dto);
    expect(spyService.updateUserById).toHaveBeenCalled();
    expect(spyService.updateUserById).toHaveBeenCalledWith(userId, dto);
  })

  it("calling deleteUser method", async () => {
    await userController.deleteUser(userId);
    expect(spyService.deleteUser).toHaveBeenCalled();
    expect(spyService.deleteUser).toHaveBeenCalledWith(userId);
  })

});