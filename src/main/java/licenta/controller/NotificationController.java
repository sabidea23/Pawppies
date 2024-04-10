package licenta.controller;

import licenta.dto.NotificationRequest;
import licenta.entity.Notification;
import licenta.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Notification createNotification(@RequestBody NotificationRequest notificationRequest) {
        return this.notificationService.createNotification(notificationRequest);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public List<Notification> getAllNotifications() {
        return this.notificationService.getAllNotifications();
    }

    @GetMapping("/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable("userId") Long userid) {
        return this.notificationService.getNotificationsByUserId(userid);
    }

    @PutMapping("/{userId}/read/{notificationId}")
    @ResponseStatus(HttpStatus.OK)
    public void userReadNotificationById(@PathVariable("userId") Long userId, @PathVariable("notificationId") Long notificationId) {
        this.notificationService.userReadNotificationById(userId, notificationId);
    }
}
