# Nest.js

## Node.js

```bash
node ./index.js --watch

node ./index.js --env-file ./.env.development
node ./index.js --env-file ./.env.production
```

```js
// 彩色打印
import { styleText } from 'node:util';
console.log(styleText('blue', 'Hello World'));
```

## nest 命令行

```bash
nest --help

# ./src/demo/demo.controller.ts
# ./src/demo/demo.controller.spec.ts
nest generate controller demo
nest g co demo

# ./src/demo/demo.module.ts
nest generate module demo
nest g mo demo

# ./src/demo/demo.service.ts
# ./src/demo/demo.service.spec.ts
nest generate service demo
nest g s demo

# ./src/user/dto/create-user.dto.ts
# ./src/user/dto/update-user.dto.ts
# ./src/entities/user.entity.ts
# ./src/user/user.controller.ts
# ./src/user/user.module.ts
# ./src/user/user.service.ts
nest generate resource user
nest g res user
```

## 装饰器

- [接口版本, 装饰器](./src/user/user.controller.ts)

## session

```bash
pnpm add express-session
pnpm add @types/express-session

# 验证码
pnpm add svg-captcha
```

允许 axios 携带 cookie `axios.defaults.withCredentials = true`

## Provider

```ts
// ./src/app.module.ts
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    // 提供 AppService2 的实例
    AppService2,
    {
      // 提供 token === "NestAppService" 的对象
      provide: 'NestAppService',
      useClass: AppService,
    },
    {
      // 提供 token === "Languages" 的对象
      provide: 'Languages',
      useValue: ['JavaScript', 'TypeScript', 'Cpp'],
    },
    {
      provide: 'DateStr',
      // 从 IOC 容器中取出并注入 AppService2 的实例
      inject: [AppService2],
      // 支持异步
      async useFactory(appService2: AppService2) {
        return new Promise((resolve) => {
          console.log('Please wait for 3s');
          setTimeout(() => {
            console.log(appService2.getHello());
            resolve(new Date().toString());
          }, 3000);
        });
        // Hello AppService2
      },
    },
  ],
})
export class AppModule {}
```

```ts
// ./src/app.controller.ts
@Controller()
export class AppController {
  constructor(
    // 从 IOC 容器中按 token === "NestAppService" 取出
    // 并注入 appService, 以构造 appController
    @Inject('NestAppService')
    private readonly appService: AppService,
    // 从 IOC 容器中按 token === "Languages" 取出
    // 并注入 langs, 以构造 appController
    @Inject('Languages') private readonly langs: string[],
    // 从 IOC 容器中按 token === "DateStr" 取出
    // 并注入 DateStr, 以构造 appController
    @Inject('DateStr') private readonly dateStr: string,
  ) {
    console.log('Provide by Nest.js IOC container', this.dateStr);
    appService.dateStr = this.dateStr;
    this.appService.setLangs(this.langs);
  }

  @Get()
  getHello(): string[] {
    this.langs.push(this.dateStr);
    return this.langs;
  }
}
```

## 模块

创建 user 模块 `nest g mo user`

`app.module.ts` 中会自动导入 user 模块

```ts
@Module({
  imports: [UserModule],
});
```

### 共享模块

默认 Service 仅在本 Module 下可用，如果希望 Service 跨 Module 可用，则需要 exports 导出

```ts
// ./src/user/user.module.ts
@Module({
  controllers: [UserController],
  // 为 UserController 的构造方法提供 UserService 的实例
  providers: [UserService],
  // 默认 UserService 仅在本 UserModule 下可用，在其他 Module 下不可用
  // 如果希望 UserService 跨 Module 可用，则需要在 exports 中导出

  //! Optional list of the subset of providers that are provided by this module
  //! and should be available in other modules which import this module.
  exports: [UserService],
})
export class UserModule {}
```

```ts
// ./src/app.module.ts
@Module({
  //! Optional list of the subset of providers that are provided by this module
  //! and should be available in other modules which import this module.
  imports: [UserModule],
  // ...
});
export class AppModule {}

// userService is available in ./src/app.controller.ts
```

### 全局模块

```ts
// ./src/config/config.module.ts
@Global() // 全局模块
@Module({
  providers: [
    {
      provide: 'Config.baseUrl',
      useValue: {
        baseUrl: '/api',
      },
    },
  ],
  // 必须在 exports 中导出
  exports: [
    {
      provide: 'Config.baseUrl',
      useValue: {
        baseUrl: '/api',
      },
    },
  ],
})
export class ConfigModule {}
```

```ts
// ./src/app.controller.ts
@Module({
  // 在 ./src/app.controller.ts 的 imports 中导入
  imports: [ConfigModule],
})
export class AppModule {}
```

```ts
// 全局使用
export class UserController {
  constructor(
    @Inject('Config.baseUrl') private readonly baseUrl: { baseUrl: string },
  ) {
    // { baseUrl: '/api' }
    console.log(this.baseUrl);
  }
}
```

### 动态模块

```ts
// ./src/config/config.module.ts
@Global()
export class ConfigModule {
  // 动态模块
  static makeDynamic(options: { path: string }): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config.baseUrl',
          useValue: {
            baseUrl: '/api' + options.path,
          },
        },
      ],
      exports: [
        {
          provide: 'Config.baseUrl',
          useValue: {
            baseUrl: '/api' + options.path,
          },
        },
      ],
    };
  }
}
```

```ts
// ./src/app.controller.ts
@Module({
  // 在 ./src/app.controller.ts 的 imports 中导入
  imports: [ConfigModule.makeDynamic({ path: '/star-rail' })],
})
export class AppModule {}
```

```ts
// 全局使用
export class UserController {
  constructor(
    @Inject('Config.baseUrl') private readonly baseUrl: { baseUrl: string },
  ) {
    // { baseUrl: '/api/star-rail' }
    console.log(this.baseUrl);
  }
}
```

## 中间件

### 依赖注入中间件

```bash
# ./src/logger/logger.middleware.ts
# ./src/logger/logger.middleware.spec.ts
nest generate middleware logger
nest g mi logger
```

```ts
// ./src/logger/logger.middleware.ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: ExpressRequest, res: ExpressResponse, next: () => void) {
    console.log(Object.keys(req), Object.keys(res));
    res.send('Intercepted by middleware');
    // next();
  }
}
```

```ts
// ./src/user/user.module.ts
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('user')
    // consumer.apply(LoggerMiddleware).forRoutes(UserController)
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'user',
      method: RequestMethod.GET, // 只对 GET 请求使用拦截器
    });
  }
}
```

### 全局中间件

```ts
function globalMiddleware(
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) {
  console.log(req.originalUrl);
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用全局中间件
  app.use(globalMiddleware);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

## 跨域

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // 或 app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

## 文件上传

```bash
pnpm add multer
pnpm add @types/multer -D

nest generate resource upload
nest g res upload
```

```ts
// ./src/upload/upload.module.ts
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../assets'),
        filename: (
          req: ExpressRequest,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          return callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
```

```ts
// ./src/upload/upload.controller.ts
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('sf')
  // FileInterceptor 上传单个文件
  // FileInterceptors 上传多个文件
  @UseInterceptors(FileInterceptor('fileEntity'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return { UploadImage: file.filename };
  }
}
```

```ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // 使用静态资源目录 http://localhost3000/static/
  app.useStaticAssets(join(__dirname, 'assets'), {
    prefix: '/static',
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

```tsx
// ./frontend/src/App.tsx
function App() {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    if (!fileRef.current || !fileRef.current.files) {
      return;
    }
    const formData = new FormData();
    // 这里的 name 必须是 fileEntity
    formData.append(
      'fileEntity' /** name */,
      fileRef.current.files[0] /** value */,
    );
    fetch('/api/upload/sf', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(console.log);
  };

  return (
    <>
      <Input type="file" inputRef={fileRef} />
      <Button onClick={handleUpload}>upload</Button>
    </>
  );
}

export default App;
```

## 文件下载

```ts
// ./src/upload/upload.controller.ts
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('download')
  download(@Res() res: ExpressResponse) {
    const dirpath = join(__dirname, '../assets');
    const filenames = readdirSync(dirpath);
    if (!filenames.length) {
      return res.status(404).send('Files not found');
    }
    const latestFilename = filenames[0];
    const latestFilepath = join(dirpath, latestFilename);
    res.download(latestFilepath);
  }
}
```

```ts
// ./frontend/src/App.tsx
const handleDownload = () => open('http://localhost:3000/upload/download');
```

### 二进制流文件下载

```ts
// ./src/upload/upload.controller.ts
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('tar')
  downloadTar(@Res() res: ExpressResponse) {
    const dirpath = join(__dirname, '../assets');
    const filenames = readdirSync(dirpath);
    if (!filenames.length) {
      return res.status(404).send('Files not found');
    }
    const latestFilename = filenames[0];
    const latestFilepath = join(dirpath, latestFilename);
    const tarStream = new zip.Stream();
    tarStream.addEntry(latestFilepath);
    res.setHeader('Content-Type', 'application/octet-stream');
    tarStream.pipe(res);
  }
}
```

```ts
// ./frontend/src/App.tsx
const handleDownloadStream = async () => {
  const buf = await fetch('/api/upload/tar').then((res) => res.arrayBuffer());
  const blob = new Blob([buf]);
  const url = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.href = url;
  aTag.download = 'latestFile.zip';
  aTag.click();
};
```

## 拦截器

### 全局响应拦截器

```ts
// ./src/common/res_interceptor.ts
interface IResponseData<T> {
  data: T;
  ok: boolean;
  msg: string;
}

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<IResponseData<T>> | Promise<Observable<IResponseData<T>>> {
    return next.handle().pipe(
      map((data: T) => {
        return {
          data,
          ok: true,
          msg: 'rxjs',
        };
      }),
    );
  }
}
```

```ts
// ./src/main.ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // 使用全局拦截器
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

## 过滤器

### 全局异常过滤器

```ts
// ./src/common/err_filter.ts
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<ExpressRequest>();
    const res = ctx.getResponse<ExpressResponse>();
    const status = exception.getStatus();
    res.status(status).json({
      status,
      ok: false,
      timestamp: Date.now(),
      msg: exception.message,
      url: req.url,
    });
  }
}
```

```ts
// ./src/main.ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // 使用全局过滤器
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

## 管道

- ValidationPipe
- ParseIntPipe, ParseFloatPipe, ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe

```ts
export class UserController {
  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    console.log(typeof id); // string
    return this.userService.findOne(Number.parseInt(id));
  }

  @Get(':id')
  @Version('2')
  // 通过 ParseIntPipe 管道将 id 转换为 number 类型
  findOne2(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id); // number
    return this.userService.findOne(id);
  }

  @Get(':uuid')
  @Version('3')
  findOne3(@Param('uuid', ParseUUIDPipe) uuid: string) {
    console.log(typeof uuid); // string
    return this.userService.findOne(0);
  }
}
```

```bash
# ./src/login/login.pipe.ts
nest generate pipe login
nest g pi login
```

### 案例 1

```ts
// ./src/login/login.controller.ts
@Controller('login')
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
}
```

```ts
// ./src/login/login.pipe.ts
@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    return value;
  }
}
```

### 案例 2：字段校验管道

```bash
pnpm add class-validator class-transformer
```

```ts
// ./src/login/login.controller.ts
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // curl -X POST -d "name=bbb&age=2" http://localhost:3000/v1/login
  @Post()
  @Version('1')
  create(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }
}
```

```ts
// ./src/login/dto/create-user.dto.ts
export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15, {
    message: 'name.length >= 3 && name.length <= 15',
  })
  name: string;
  @IsString()
  age: string;
  constructor() {}
}
```

```ts
// ./src/login/login.pipe.ts
@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    // { metatype: [class CreateLoginDto], type: 'body', data: undefined }
    console.log(metadata);
    // { name: 'bbb', age: '2' }
    console.log(value);
    if (!metadata.metatype) {
      throw new HttpException(
        'metadata.metatype is empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 反射
    const dto = plainToInstance(
      metadata.metatype /** CreateLoginDto */,
      value,
    ) as CreateUserDto;
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
```

### 案例 3：全局校验管道

```ts
// ./src/main.ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // 不使用全局过滤器
  // app.useGlobalFilters(new GlobalExceptionFilter());
  // 使用全局校验管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
```

```ts
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // curl -X POST -d "name=b&age=2" http://localhost:3000/v3/login
  @Post()
  @Version('3')
  create3(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }
}
// {"message":["name.length >= 3 && name.length <= 15"],"error":"Bad Request","statusCode":400}
```

## 守卫

```bash
# ./src/login/login.guard.ts
nest g gu login
nest generate guard login
```

```ts
// ./src/login/login.guard.ts
@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(styleText('blue', Object.keys(context).join(' ')));
    return true;
  }
}
```

### 案例 1：在 controller 中使用守卫

```ts
// ./src/login/login.controller.ts
@Controller('login')
@UseGuards(LoginGuard)
export class LoginController {}
```

### 案例 2：全局守卫

```ts
// ./src/main.ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // 使用全局守卫
  app.useGlobalGuards(new LoginGuard());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

### 案例 3：元数据

```ts
// ./src/login/login.controller.ts
@Controller('login')
@UseGuards(LoginGuard)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // curl http://localhost:3000/login?role=admin
  @Get()
  @SetMetadata('myKey', 'myValue')
  @SetMetadata('roles', ['admin'])
  findAll(@Request() req: ExpressRequest) {
    console.log(req.query);
    return this.loginService.findAll();
  }
}
```

```ts
// ./src/login/login.guard.ts
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // [ 'args', 'constructorRef', 'handler', 'contextType' ]
    console.log(Object.keys(context));
    // myKey myValue
    console.log(
      'myKey',
      this.reflector.get<string>('myKey', context.getHandler()),
    );
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles); // [ 'admin' ]
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    const role = req.query.role as string;
    return roles.includes(role); // 拦截或放行
  }
}
```

顺序：Request -> Middleware -> Guard -> Interceptor -> Controller -> (Error) Interceptor -> Response

## 自定义装饰器

```bash
# ./src/custom/custom.decorator.ts
nest generate decorator custom
nest g d custom
```

### 类装饰器

```ts
// ./src/custom/custom.decorator.ts
// 类装饰器
export const Custom = (...args: string[]) => SetMetadata('myArgs', args);
// 参数装饰器
export const ReqUrl = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.log(data); // wtf
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    return req.url;
  },
);
```

```ts
// ./src/login/login.controller.ts
@Controller('login')
@UseGuards(LoginGuard)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @Custom('a', 'b', 'c')
  findAll(@Request() req: ExpressRequest, @ReqUrl('wtf') reqUrl: string) {
    console.log(reqUrl); // /login?role=admin
    return this.loginService.findAll();
  }
}
// curl http://localhost:3000/login?role=admin
```

```ts
// ./src/login/login.guard.ts
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // myArgs [ 'a', 'b', 'c' ]
    console.log(
      'myArgs',
      this.reflector.get<string[]>('myArgs', context.getHandler()),
    );
    return true;
  }
}
```

## 集成 swagger

```bash
pnpm add @nestjs/swagger swagger-ui-express
```

```ts
// ./src/main.ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const options = new DocumentBuilder()
    .addBearerAuth() // swagger 发送请求时，自动携带 token
    .setTitle('nest-demo title')
    .setDescription('nest-demo description')
    .setVersion('1')
    .build();
  // @ts-ignore
  const document = SwaggerModule.createDocument(app, options);
  // @ts-ignore
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

controller 分组

```ts
// ./src/user/user.controller.ts
@ApiTags('UserController')
@ApiBearerAuth() // swagger 发送请求时，自动携带 token
@Controller('user')
export class UserController {
  @Get()
  @ApiOperation({ summary: 'Find all users', description: 'Find all users' })
  @ApiQuery({ name: 'page', description: 'For pagination' })
  @ApiResponse({ status: 200, description: '200 OK' })
  findAll(@Request() req: ExpressRequest) {
    return this.userService.findAll();
  }

  @Get(':id') // url 路径参数
  @ApiParam({ name: 'id', description: 'The user ID', required: true })
  findOne(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.userService.findOne(Number.parseInt(id));
  }

  @Post()
  create(@Request() req: ExpressRequest, @Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
```

```ts
// ./src/dto/create-user.dto.ts
export class CreateUserDto {
  @ApiProperty({ example: 'whoami' })
  name: string;
  @ApiProperty({
    example: 22,
    type: 'number',
    required: true,
    enum: [22, 23, 24],
  })
  age: number;
}
```

## 连接数据库

```bash
pnpm add @nestjs/typeorm typeorm mysql2
```

```ts
// ./src/app.module.ts
@Module({
  imports: [
    UserModule,
    ConfigModule.makeDynamic({ path: '/sr' }),
    UploadModule,
    LoginModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'pass',
      host: 'localhost',
      port: 3306,
      database: 'db0',
      // 可以自动加载 entity
      // entities: [join(__dirname, './**/*.entity{.js,.ts}')],
      synchronize: true, // 自动将 entity 同步到数据库
      retryDelay: 500,
      retryAttempts: 3, // 连接数据库的重试次数
      autoLoadEntities: true, // 自动加载 entity
    }),
    EmployeeModule,
  ],
  // ...
})
export class AppModule {}
```

```ts
// ./src/employee/employee.entity.ts
@Entity()
export class Employee /** 表名 */ {
  @PrimaryGeneratedColumn()
  id: number; // 自增主键
  @Column({ type: 'varchar', length: 255 })
  name: string; // 字段名
  @Column({ type: 'enum', enum: [1, 2, 3], default: 1 })
  age: number;
  @Column({ select: true, comment: 'myComment', nullable: false })
  password: string;
  @Generated('uuid')
  uuid: string;
  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column('simple-array')
  // 使用 roles.join(',') 存储到数据库
  roles: string[];
  @Column('simple-json')
  // 使用 JSON.stringify(user) 存储到数据库
  user: { name: string; age: number };
}
```

```ts
// ./src/employee/employee.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
```

```bash
docker exec -it mysql_container bash
```
