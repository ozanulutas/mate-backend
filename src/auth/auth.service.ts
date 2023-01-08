import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const isPasswordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.createUser(registerDto);

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string) {
    const secret = this.config.get('JWT_SECRET');
    const payload = {
      userId,
      email,
    };

    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '60m',
        secret,
      }),
    };
  }
}
