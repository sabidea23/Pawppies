package licenta.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotificationRequest {
    private Long userId;
    private String message;
    String author;
}
