import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (req.params.userId && req.params.userId !== 'me') {
      return +req.params.userId;
    }

    return req.user.userId;
  },
);
