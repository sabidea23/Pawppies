package licenta.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@NoArgsConstructor
public class NotificationRequest {
    private Long userId;
    private String message;
    String author;
}
