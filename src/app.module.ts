import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { dataBaseConfig } from './database/database.config';
import { AuthService } from './auth/service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './../constants/index';
import { TasksService } from './tasks/tasks.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt-auth.guard';
import { LocalStrategy } from './auth/strategy/local.strategy';

@Module({
  imports: [
  TasksModule,
    AuthModule,
    TypeOrmModule.forRoot(dataBaseConfig),
    PassportModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
