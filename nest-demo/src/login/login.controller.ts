import {
  Controller,
  Post,
  Body,
  Version,
  UseGuards,
  Request,
  Get,
  SetMetadata,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginPipe } from './login.pipe';
import { LoginGuard } from './login.guard';
import { Request as ExpressRequest } from 'express';
import { Custom, ReqUrl } from 'src/custom/custom.decorator';

@Controller('login')
@UseGuards(LoginGuard)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // curl -X POST -d "name=bbb&age=2" http://localhost:3000/v1/login
  @Post()
  @Version('1')
  create(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
    // {"name":"bbb","age":"2"}
    // { metatype: [class CreateLoginDto], type: 'body', data: undefined }
    return this.loginService.create(createLoginDto);
  }

  // curl -X POST -d "name=bbb&age=2" http://localhost:3000/v2/login
  @Post()
  @Version('2')
  create2(@Body('name', LoginPipe) createLoginDto: CreateLoginDto) {
    // "bbb"
    // { metatype: [class CreateLoginDto], type: 'body', data: 'name' }
    return this.loginService.create(createLoginDto);
  }

  // curl -X POST -d "name=bbb&age=2" http://localhost:3000/v3/login
  @Post()
  @Version('3')
  create3(@Body() createLoginDto: CreateLoginDto) {
    // "bbb"
    // { metatype: [class CreateLoginDto], type: 'body', data: 'name' }
    return this.loginService.create(createLoginDto);
  }

  // curl http://localhost:3000/login?role=admin
  @Get()
  @SetMetadata('myKey', 'myValue')
  @SetMetadata('roles', ['admin'])
  @Custom('a', 'b', 'c')
  findAll(@Request() req: ExpressRequest, @ReqUrl('abc') reqUrl: string) {
    console.log('reqUrl', reqUrl);
    // console.log('req.query', req.query);
    return this.loginService.findAll();
  }
}
