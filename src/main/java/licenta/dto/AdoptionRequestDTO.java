package licenta.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdoptionRequestDTO {
    Long userId;
    Long animalRequestedId;
    String reason;
    String firstName;
    String lastName;
    String email;
    String phone;
}
