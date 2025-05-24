import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Response,
  Headers,
  HttpCode,
  Session,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import * as svgCaptcha from 'svg-captcha';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('UserController')
@ApiBearerAuth()
// @Controller('user')
@Controller({
  path: 'user',
  // version: '1', // 接口版本，所有方法都有 /v1
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('Config.baseUrl') private readonly baseUrl: { baseUrl: string },
  ) {
    console.log(this.baseUrl);
  }

  @Get('captcha')
  // @Req
  // @Res
  createCaptcha(
    @Response() res: ExpressResponse,
    @Session() session: Record<string, unknown>,
  ) {
    // console.log(svgCaptcha);
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#fff',
    });
    // console.log(session);
    session.captcha = captcha?.text;
    res.type('image/svg+xml');
    res.send(captcha?.data);
  }

  @Post('user')
  // @HttpCode(200)
  createUser(
    @Body() body: Record<string, unknown>,
    @Session() session: Record<string, unknown>,
  ) {
    // console.log(body);
    // console.log(session);

    if (
      (session.captcha as string).toLowerCase() ===
      (body.captcha as string).toLowerCase()
    ) {
      return {
        httpCode: 200,
        msg: 'Captcha match',
      };
    }

    return {
      httpCode: 200,
      msg: 'Captcha error',
    };
  }

  // -d, --data 表单数据
  //! 默认 Content-Type: application/x-www-form-urlencoded
  // curl -X POST -d "name=bbb&age=2" http://localhost:3000/user?name=aaa
  //! -H, --header 自定义请求头
  // curl -X POST -H "Content-Type: application/json" -d '{"name":"bbb","age":2}' http://localhost:3000/user?name=aaa
  @Post()
  create(@Request() req: ExpressRequest, @Body() body: CreateUserDto) {
    console.log(req.query); // { name: 'aaa' }
    console.log(req.body); // { name: 'bbb', age: 2 }
    console.log(body); // { name: 'bbb', age: 2 }
    return this.userService.create(body);
  }

  // curl http://localhost:3000/v1/user?name=whoami
  @Get()
  @Version('1') // 接口版本，只有该方法有 /v1
  //? swagger
  @ApiOperation({ summary: 'Find all users', description: 'Find all users' })
  @ApiQuery({ name: 'page', description: 'For pagination' })
  @ApiResponse({ status: 200, description: '200 OK' })
  findAll(@Request() req: ExpressRequest) {
    console.log(req.query);
    return this.userService.findAll();
  }

  // curl http://localhost:3000/v2/user?name=whoami
  // @Get()
  // @Version('2') // 接口版本，只有该方法有 /v2
  // findAll2(@Query() query: Record<string, unknown>) {
  //   console.log(query);
  //   return this.userService.findAll();
  // }

  // curl http://localhost:3000/user/1
  @Get(':id') // url 路径参数
  // id 只能是 string 类型
  //? swagger
  @ApiParam({ name: 'id', description: 'The user ID', required: true })
  findOne(@Param('id') id: string, @Request() req: ExpressRequest) {
    console.log(id); // 1
    console.log(req.params); // { id: '1' }
    return this.userService.findOne(Number.parseInt(id));
  }

  // curl -X PATCH -H "Content-Type: application/json" -d '{"name":"whoami","age":2}' http://localhost:3000/user/1
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('name') name: string, // 自动解构 name
    @Body('age') age: number, // 自动解构 age
    @Body() updateUserDto: UpdateUserDto,
    @Headers() headers: Record<string, unknown>,
  ) {
    console.log(id, name, age); // whoami 2
    console.log('headers', headers);
    return this.userService.update(Number.parseInt(id), updateUserDto);
  }

  // curl -X DELETE http://localhost:3000/user/1
  //! -s, --silent 静默模式
  // curl -s -o /dev/null -w "%{http_code}" -X DELETE http://localhost:3000/user/1
  @Delete(':id')
  @HttpCode(500)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    console.log(id, typeof id); // string
    return this.userService.remove(0);
  }
}
