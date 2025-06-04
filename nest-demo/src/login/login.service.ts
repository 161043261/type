import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { styleText } from 'node:util';

@Injectable()
export class LoginService {
  create(createLoginDto: CreateLoginDto) {
    console.log(styleText('green', JSON.stringify(createLoginDto)));
    return 'This action adds a new login';
  }

  findAll() {
    return `This action returns all login`;
  }
}
