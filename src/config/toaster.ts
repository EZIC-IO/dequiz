import { ToastContainerProps } from 'react-toastify';

export const TOASTER_CONFIG: ToastContainerProps = {
  position: 'top-right',
  autoClose: 5000,
  newestOnTop: true,
  draggable: false,
  limit: 5,
  hideProgressBar: true,
  theme: 'dark',
};
