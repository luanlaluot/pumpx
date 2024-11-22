import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload'; // JwtPayload interface

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the 'Authorization' header
      ignoreExpiration: false, // Ensure that expired tokens are rejected
      secretOrKey: process.env.JWT_SECRET, // process.env.JWT_SECRET, // This should match the secret used to sign the JWT
    });
  }

  // Validate the JWT payload
  async validate(payload: JwtPayload) {
    return { username: payload.username }; // Attach user information to request object
  }
}
