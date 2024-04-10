package licenta.service.implementation;

import licenta.dto.NotificationRequest;
import licenta.entity.Notification;
import licenta.entity.User;
import licenta.repo.NotificationRepository;
import licenta.repo.UserRepository;
import licenta.service.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public Notification createNotification(NotificationRequest notificationRequest) {
        Optional<User> user = this.userRepository.findById(notificationRequest.getUserId());
        Notification notification = Notification.builder()
                .message(notificationRequest.getMessage())
                .userNotificated(user.get())
                .localDate(LocalDateTime.now())
                .isReadByUser(false)
                .author(notificationRequest.getAuthor())
                .build();

        return this.notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return this.notificationRepository.findAll();
    }

    public List<Notification> getNotificationsByUserId(Long userId) {
        return this.notificationRepository.findByUserNotificatedId(userId);
    }

    public void userReadNotificationById(Long userId, Long notificationId) {
        List<Notification> notifications = this.getNotificationsByUserId(userId);
        for (Notification notification:notifications) {
            if (Objects.equals(notification.getId(), notificationId)) {
                notification.setIsReadByUser(true);
                this.notificationRepository.save(notification);
            }
        }
    }
}
