import { notify } from 'react-notify-toast';

export const alert = (message, type) => notify.show(message, type, 2000);