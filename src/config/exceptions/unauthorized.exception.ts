import { HttpException, HttpStatus } from '@nestjs/common';
import { createToast } from '../notification/notification';
import { ToastType } from '../notification/notification.enum';

export class UnauthorizedException extends HttpException {
  constructor() {
    super(
      {
        message: 'Unauthorized',
        ...createToast({
          text: 'Unauthorized',
          type: ToastType.ERROR,
        }),
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
