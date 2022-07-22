import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtInfo } from '../dto/jwt.dto';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const ip = request?.headers['x-forwarded-for'];

    const user = { ...request.user, ip } as JwtInfo;

    return data ? user?.[data] : user;
  },
);
