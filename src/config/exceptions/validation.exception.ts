import { HttpException, HttpStatus } from '@nestjs/common';
import { createToast } from '../notification/notification';
import { ToastType } from '../notification/notification.enum';

export class ValidationException extends HttpException {
  constructor() {
    super(
      {
        message: 'Please check all fields',
        ...createToast({
          text: 'Please check all fields',
          type: ToastType.ERROR,
        }),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
