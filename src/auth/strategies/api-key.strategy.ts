import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../user/auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private authService: AuthService) {
    super({ header: 'x-api-key', prefix: '' }, true, async (apiKey, done) => {
      const checkingApiKey = this.authService.validateApiKey(apiKey);
      if (!checkingApiKey) {
        done(new UnauthorizedException(), false);
      }

      done(null, true);
    });
  }
}
