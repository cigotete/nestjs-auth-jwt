import { Body, Controller, Post } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post()
  async createRefreshToken(@Body('userId') userId: string) {
    return this.refreshTokenService.createRefreshToken(userId);
  }
}