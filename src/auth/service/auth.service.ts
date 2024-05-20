import { Injectable, HttpException, HttpStatus, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async register(user: User): Promise<User> {
    //check if user exists
    const result = await this.validateUser(user.email, user.password);
    if(result) {
      throw new ConflictException()
    }
    const hashSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, hashSalt);
    return await this.userRepository.save({ ...user, password: passwordHash });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }

      return null;
    }
    return null;
  }

  async login(user: any) {
    const result = await this.validateUser(user.email, user.password);
    if (result) {
      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwt.sign(payload);
      return {
        access_token,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
