import { NotificationPermissionType } from './types';

export const requestNotificationPermission =
  (): Promise<NotificationPermissionType> => {
    if (!('Notification' in window)) {
      return new Promise(resolve =>
        resolve(NotificationPermissionType.NOT_SUPPORTED),
      );
    } else if (Notification.permission === NotificationPermissionType.DEFAULT) {
      return Notification.requestPermission() as Promise<NotificationPermissionType>;
    }
    return new Promise(resolve =>
      resolve(Notification.permission as NotificationPermissionType),
    );
  };

const defaultNotificationOptions = {};

export const maybeSendNotification = (
  title: string,
  options?: NotificationOptions,
) => {
  if (Notification.permission === NotificationPermissionType.GRANTED) {
    return new Notification(title, {
      ...defaultNotificationOptions,
      ...options,
    });
  }
};
