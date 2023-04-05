import { ToastType } from './notification.enum';

type CreateToastParams = {
  text: string;
  type?: ToastType;
};

type CreatePopupParams = {
  text: string;
  positiveButton?: {
    text: string;
  };
  negativeButton?: {
    text: string;
  };
};

export const createToast = (params: CreateToastParams) => ({
  toast: {
    text: '',
    type: ToastType.SUCCESS,
    ...params,
  },
});

export const createPopup = (params: CreatePopupParams) => ({
  popup: {
    text: '',
    positiveButton: {
      text: 'Okeyto',
    },
    negativeButton: {
      text: 'Cancel',
    },
    ...params,
  },
});
