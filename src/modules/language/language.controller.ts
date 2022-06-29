import { 
  Controller, 
  Post, 
  Body, 
  Get,
  Patch,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  ParseIntPipe
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { ValidationPipe } from '../../utility/validationPipe';
import { CreateLanguageRequestDto } from './dto/request/createLanguageRequest.dto';
import { ResponseDto } from '../../utility/responseDto';
import { GetLanguageResponse } from './dto/response/getLanguageResponse.dto';
import { GetLanguagesResponse } from './dto/response/getLanguagesResponse';
import { LanguageRequestResponse } from './dto/response/languageCreateResponse.dto';
import { Language } from './language.entity';
import { Logger } from '../../utility/logger';
import { RESPONSE } from '../../constants/successMessage';
import { LanguageUpdateRequestDto } from './dto/request/updateLanguageRequest.dto';
import { SearchLanguageRequestDto } from './dto/request/searchLanguageRequest.dto';
import { ERRROR } from '../../constants/errorMessage';
  
@Controller('/language')
export class LanguageController {
  constructor(
    private readonly languageService: LanguageService,
    private readonly logger: Logger
  ) {}
  
  @Post()
  async createLanguage(
    @Body(new ValidationPipe<CreateLanguageRequestDto>()) createLanguageDto: CreateLanguageRequestDto
  ): Promise<ResponseDto<LanguageRequestResponse>> {
    try {
      const exisitingLanguage = await this.languageService.findOneLanguage({ code: createLanguageDto.code.toLocaleLowerCase(), is_deleted: false });
      if (exisitingLanguage) {
        throw new HttpException(ERRROR.LANGUAGE.EXISTS, HttpStatus.CONFLICT);
      } else {
        const languageId = await this.languageService.createLanguage(createLanguageDto);
        return new ResponseDto<LanguageRequestResponse>(
          new LanguageRequestResponse(languageId),
          RESPONSE.LANGUAGE.CREATED,
          HttpStatus.CREATED
        );
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Patch(':id')
  async updateLanguageFieldsById(
    @Param('id', ParseIntPipe) languageId: number,
    @Body(new ValidationPipe<LanguageUpdateRequestDto>()) languageUpdateDto: LanguageUpdateRequestDto
  ): Promise<ResponseDto<GetLanguageResponse>> {
    try {
      const exisitingLanguage = await this.languageService.findOneLanguage({ id: languageId, is_deleted: false });
      if (!exisitingLanguage) {
        throw new HttpException(ERRROR.LANGUAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
      } else { 
        const updatedLanguage: Language = await this.languageService.updateLanguageById(languageId, languageUpdateDto);
        return new ResponseDto<GetLanguageResponse>(
          updatedLanguage,
          RESPONSE.LANGUAGE.UPDATED,
          HttpStatus.OK
        )
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllLanguages(
    @Query(new ValidationPipe<SearchLanguageRequestDto>()) searchLanguageRequesDto: SearchLanguageRequestDto
  ): Promise<ResponseDto<GetLanguagesResponse>> {
    try {
      const result = await this.languageService.getAllLanguages(searchLanguageRequesDto);
      return new ResponseDto<GetLanguagesResponse>(
        new GetLanguagesResponse(
          result.data.map(language => {
            return new GetLanguageResponse(
              language.id,
              language.name,
              language.code,
              language.is_deleted,
              language.created_at,
              language.updated_at,
            );
          }),
          result.record_per_page,
          result.total_count
        ),
        RESPONSE.LANGUAGE.FOUND, 
        HttpStatus.OK
      );
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Delete(':id')
  async deleteLanguage(
    @Param('id', new ParseIntPipe()) languageId: number
  ): Promise<ResponseDto<LanguageRequestResponse>> {
    try {
      const exisitingLanguage = await this.languageService.findOneLanguage({ id: languageId, is_deleted: false });
      if (!exisitingLanguage) {
        throw new HttpException(ERRROR.LANGUAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
      } else {
        await this.languageService.deleteLanguageById(languageId)
        return new ResponseDto<LanguageRequestResponse>(
          new LanguageRequestResponse(languageId),
          RESPONSE.LANGUAGE.DELETED,
          HttpStatus.OK
        )
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete()
  async deleteAllLanguages(
    ): Promise<ResponseDto<any>> {
    try {
      await this.languageService.deleteAllLanguages()
      return new ResponseDto<LanguageRequestResponse>(
        null,
        RESPONSE.LANGUAGE.DELETED,
        HttpStatus.OK
      )
    } catch(err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}