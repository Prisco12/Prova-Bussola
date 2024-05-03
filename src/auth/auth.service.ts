import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByName(loginDto.name);

    const isMatch = await bcrypt.compare(loginDto.password, user.password)

    if (!user.password || !isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}