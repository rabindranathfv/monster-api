import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
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
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { USER_REPOSITORY } from './user/repository/user.repository';
import { UserAdapterRepository } from './user/repository/user-adapter.repository';
import { AUTH_REPOSITORY } from './repository/auth.repository';
import { AuthAdapterRepository } from './repository/auth-adapter.repository';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const jwtConfig = config.get('JWT');

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
    JwtAuthGuard,
    RolesGuard,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthAdapterRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserAdapterRepository,
    },
  ],
  exports: [
    AuthService,
    UserService,
    JwtStrategy,
    PassportModule,
    JwtModule,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthAdapterRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserAdapterRepository,
    },
  ],
})
export class AuthModule {}
