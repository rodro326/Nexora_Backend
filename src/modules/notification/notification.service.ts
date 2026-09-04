import Notification from "./notification.model";

const createNotification = async (
  userId: string,
  payload: {
    title: string;
    message: string;
    type:
      | "order"
      | "payment"
      | "shipping"
      | "promotion"
      | "system";
  }
) => {
  const notification = await Notification.create({
    user: userId,
    ...payload,
    isRead: false,
  });

  return notification;
};

const getMyNotifications = async (userId: string) => {
  const notifications = await Notification.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  return notifications;
};

const markAsRead = async (
  notificationId: string,
  userId: string
) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      user: userId,
    },
    {
      $set: {
        isRead: true,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  return notification;
};

const markAllAsRead = async (userId: string) => {
  const result = await Notification.updateMany(
    {
      user: userId,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );

  return result;
};

const deleteNotification = async (
  notificationId: string,
  userId: string
) => {
  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    user: userId,
  });

  return notification;
};

export const notificationService = {
  createNotification,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};