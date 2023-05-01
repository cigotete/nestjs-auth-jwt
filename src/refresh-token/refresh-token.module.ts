import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenSchema } from './refresh-token.model';
import { RefreshTokenController } from './refresh-token.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    JwtModule.register({
      secret: 'dFd19GELvAq+fhePyTNyMRR7kf8TGbK18qc6WbKYrMU=',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
