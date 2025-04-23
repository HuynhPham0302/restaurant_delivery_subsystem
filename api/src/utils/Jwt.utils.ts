// Code: Sign JWT token using JWT library

import jwt from 'jsonwebtoken';

export type TJwtPayload = {
  id: number;
  provider: string;
  role: string;
  email: string;
};

class JWT {
  private static secret = process.env.JWT_SECRET || 'secret';

  static sign(payload: TJwtPayload) {
    return jwt.sign(payload, this.secret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  static verify(token: string) {
    return jwt.verify(token, this.secret, { ignoreExpiration: false });
  }
}

export default JWT;
