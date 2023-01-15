import { ToastType } from './feedback.enum';

type CreateToastParams = {
  text: string;
  type?: ToastType;
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

// @TODO: change name to toast
export const createToast = (params: CreateToastParams) => ({
  toast: {
    text: '',
    type: ToastType.SUCCESS,
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
