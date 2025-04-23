import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../utils/Error.utils';
import JWT, { TJwtPayload } from '../utils/Jwt.utils';

type TRoleBase = 'admin' | 'user';

const RoleBaseMiddle = (role: TRoleBase) => (req: Request, _: Response, next: NextFunction) => {
  const jwtPayload: TJwtPayload = JWT.verify(req.headers.authorization!.split(' ')[1]) as TJwtPayload;
  if (jwtPayload.role !== role) {
    throw new ForbiddenError();
  }
  next();
};

export default RoleBaseMiddle;
