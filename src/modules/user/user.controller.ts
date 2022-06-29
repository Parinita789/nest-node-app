import { 
  Controller, 
  Post, 
  Body, 
  Get,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '../../utility/validationPipe';
import { UserRequestDto } from './dto/request/createUserRequest.dto';
import { ResponseDto } from '../../utility/responseDto';
import { CreateUserResponse } from './dto/response/createUserResponse.dto';
import { User } from './user.entity';
import { GetUserResponse } from './dto/response/getUserResponse.dto';
import { RESPONSE } from '../../constants/successMessage';
import { Logger } from '../../utility/logger';
import { UserUpdateRequestDto } from './dto/request/userUpdateRequest.dto';
import { ERRROR } from '../../constants/errorMessage';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {}

  @Post()
  async createUser(
    @Body(new ValidationPipe<UserRequestDto>())
    createUserDto: UserRequestDto
  ): Promise<ResponseDto<CreateUserResponse>> {
    try {
      // TO DO - upload user profile pic to the s3 and in the response url of the profile pic will be returned
      const existingUser = await this.userService.findOneUser({ user_name: createUserDto.user_name, is_deleted: false });
      if (existingUser) {
        throw new HttpException(ERRROR.USER.EXISTS, HttpStatus.CONFLICT);
      } else {
        createUserDto.password = await this.userService.hashPassword(createUserDto.password);
        const userId = await this.userService.createUser(createUserDto);
        return new ResponseDto<CreateUserResponse>(
          new CreateUserResponse(userId),
          RESPONSE.USER.CREATED,
          HttpStatus.CREATED
        );
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseIntPipe()) userId: number
  ): Promise<ResponseDto<GetUserResponse>> {
    try {
      const userExists = await this.userService.findOneUser({ id: userId, is_deleted: false });
      if (!userExists) {
        throw new HttpException(ERRROR.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
      } else {
        const user: User = await this.userService.getUserById(userId);
        return new ResponseDto<GetUserResponse>(
          new GetUserResponse(
            user.id,
            user.first_name, 
            user.last_name, 
            user.user_name,
            user.profile_picture_url,
            user.created_at,
            user.updated_at,
          ), 
          RESPONSE.USER.FOUND, 
          HttpStatus.OK
        );
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updateUserFieldsById(
    @Param('id', new ParseIntPipe()) userId: number,
    @Body(new ValidationPipe<UserUpdateRequestDto>()) userUpdateRequestDto: UserUpdateRequestDto
  ): Promise<ResponseDto<GetUserResponse>> {
    try {
      const user = await this.userService.findOneUser({ id: userId, is_deleted: false });
      if (!user) {
        throw new HttpException(ERRROR.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
      } else { 
        const updatedUser = await this.userService.updateUserById(userId, userUpdateRequestDto);
        return new ResponseDto<GetUserResponse>(
          new GetUserResponse(
            updatedUser.id,
            updatedUser.first_name, 
            updatedUser.last_name, 
            updatedUser.user_name,
            updatedUser.profile_picture_url,
            updatedUser.created_at,
            updatedUser.updated_at,
          ), 
          RESPONSE.USER.UPDATED,
          HttpStatus.OK
        );
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseIntPipe()) userId: number
  ): Promise<ResponseDto<any>> {
    try {
      const userExists = await this.userService.findOneUser({ id: userId, is_deleted: false });
      if (!userExists) {
        throw new HttpException(ERRROR.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
      } else { 
        // TO DO - check courses of the users, mark all courses is_deleted true before deleting the user
        await this.userService.deleteUser(userId)
        return new ResponseDto(
          null,
          RESPONSE.USER.DELETED,
          HttpStatus.OK
        ) 
      }
    } catch(err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}