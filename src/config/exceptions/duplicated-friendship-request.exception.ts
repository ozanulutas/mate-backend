import { HttpException, HttpStatus } from '@nestjs/common';
import { createToast } from '../notification/notification';
import { ToastType } from '../notification/notification.enum';
import { ActionCode } from '../config.constants';

export class DuplicatedFriendshipRequestException extends HttpException {
  constructor() {
    super(
      {
        message: 'Friendship is already requested',
        actionCode: ActionCode.GO_TO_FRIENDSHIP_REQUESTS,
        ...createToast({
          text: 'Friendship is already requested',
          type: ToastType.ERROR,
        }),
      },
      HttpStatus.CONFLICT,
    );
  }
}
