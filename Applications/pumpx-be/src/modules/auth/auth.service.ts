import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Example of user validation (you can replace with actual DB lookup)
  private validateUser(username: string, password: string) {
    // Normally you'd check the database here
    if (username === 'luanvip' && password === '123456') {
      return { username }; // Example user
    }
    return null;
  }

  // Sign and return JWT token
  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = this.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload: JwtPayload = { username: user.username };
    return {
      access_token: this.jwtService.sign(
        { ...payload },
        {
          secret: process.env.JWT_SECRET,
        },
      ), // Create and sign the JWT token
    };
  }
}
