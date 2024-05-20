import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'taskMgt',
  entities: ['dist/**/**/*.entity{.ts,.js}'],
  synchronize: true,
};
