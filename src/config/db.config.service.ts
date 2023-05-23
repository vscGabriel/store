import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: 'localhost', //this.configService.get<string>('DB_HOST'),
      port: 3306, //this.configService.get<number>('DB_PORT'),
      username: 'root', //this.configService.get<string>('DB_USER'),
      password: 'Password123', // this.configService.get<string>('DB_PASSWORD'),
      database: 'nest', //this.configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      synchronize: true,
    };
  }
}
