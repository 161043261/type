import { DynamicModule, Global, Module } from '@nestjs/common';

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
  exports: [
    {
      provide: 'Config.baseUrl',
      useValue: {
        baseUrl: '/api',
      },
    },
  ],
})
export class ConfigModule {
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
