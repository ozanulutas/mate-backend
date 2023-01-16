import { HttpException, HttpStatus } from '@nestjs/common';
import { createToast } from '../notification/notification';
import { ToastType } from '../notification/notification.enum';

export class CredentialsTakenException extends HttpException {
  constructor() {
    super(
      {
        message: 'Credentials already taken',
        ...createToast({
          text: 'Credentials already taken',
          type: ToastType.ERROR,
        }),
      },
      HttpStatus.CONFLICT,
    );
  }
}
