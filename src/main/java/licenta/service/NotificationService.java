package licenta.service;

import licenta.dto.NotificationRequest;
import licenta.entity.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getAllNotifications();

    Notification createNotification(NotificationRequest notificationRequest);

    List<Notification> getNotificationsByUserId(Long userId);

    void userReadNotificationById(Long userId, Long notificationId);
}
