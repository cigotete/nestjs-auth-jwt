import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken, RefreshTokenDocument } from './refresh-token.model';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async createRefreshToken(userId: string) {
    const payload = { sub: userId };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refresh = new this.refreshTokenModel({
      user: userId,
      token: refreshToken,
    });
    await refresh.save();
    return refresh;
  }

  async findRefreshToken(token: string) {
    return this.refreshTokenModel.findOne({ token }).exec();
  }

  async deleteRefreshToken(token: string) {
    return this.refreshTokenModel.deleteOne({ token }).exec();
  }
}