import { NotificationType } from './feedback.enum';

type CreateNotificationParams = {
  text: string;
  type?: NotificationType;
};

type CreateModalParams = {
  text: string;
  positiveButton?: {
    text: string;
  };
  negativeButton?: {
    text: string;
  };
};

export const createNotification = (params: CreateNotificationParams) => ({
  notification: {
    text: '',
    type: NotificationType.SUCCESS,
    ...params,
  },
});

export const createModal = (params: CreateModalParams) => ({
  text: '',
  positiveButton: {
    text: 'Okeyto',
  },
  negativeButton: {
    text: 'Cancel',
  },
  ...params,
});
