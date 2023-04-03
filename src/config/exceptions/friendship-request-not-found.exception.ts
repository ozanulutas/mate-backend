import { HttpException, HttpStatus } from '@nestjs/common';
import { createToast } from '../notification/notification';
import { ToastType } from '../notification/notification.enum';

export class FriendshipRequestNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: 'Friendship requested is not found',
        ...createToast({
          text: 'Friendship requested is not found',
          type: ToastType.ERROR,
        }),
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
