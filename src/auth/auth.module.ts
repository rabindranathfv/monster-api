import { Module } from '@nestjs/common';
import { AuthService } from './user/auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './shema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthJWTGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const jwtConfig = config.get('JWT');
        console.log('🚀 ~ file: auth.module.ts:20 ~ jwtConfig:', jwtConfig);

        return {
          secret: jwtConfig.secret,
          signOptions: { expiresIn: jwtConfig.expiresIn },
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController, AuthController],
  providers: [
    AuthService,
    UserService,
    ApiKeyStrategy,
    JwtStrategy,
    AuthJWTGuard,
  ],
  exports: [
    AuthService,
    UserService,
    JwtStrategy,
    PassportModule,
    JwtModule,
    AuthJWTGuard,
  ],
})
export class AuthModule {}
