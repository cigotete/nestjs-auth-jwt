import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from './../refresh-token/refresh-token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ username });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.createRefreshToken(user);
    return {
      access_token: accessToken,
      refresh_token: refreshToken.token,
    };
  }

  async createRefreshToken(user: any) {
    const payload = { sub: user.userId };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refresh = new this.refreshTokenModel({
      user: user._id,
      token: refreshToken,
    });
    await refresh.save();
    return refresh;
  }
}
