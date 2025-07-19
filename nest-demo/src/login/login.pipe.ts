import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { styleText } from 'node:util';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    // { metatype: [class CreateLoginDto], type: 'body', data: undefined }
    console.log(metadata);
    // { name: 'bbb', age: '2' }
    console.log(value);
    if (!metadata.metatype) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }

    // 反射
    const dto = plainToInstance(metadata.metatype, value) as CreateUserDto;
    // CreateLoginDto { name: 'bbb', age: '2' }
    console.log(dto);
    const aggregateErrors = await validate(dto);
    console.log(styleText('red', JSON.stringify(aggregateErrors))); // []
    if (aggregateErrors.length) {
      throw new HttpException(aggregateErrors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
