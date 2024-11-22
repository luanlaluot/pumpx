import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/jwt/jwt.strategy';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    //env
    ConfigModule.forRoot(),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: process.env.JWT_SECRET, // Load secret from .env or other config
      signOptions: { expiresIn: '60m' }, // Optional: set expiration time for JWT
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI),

    //Api modules
    AuthModule,
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
