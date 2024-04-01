package licenta.dto;

import licenta.entity.OpeningHours;
import licenta.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimalCenterResponseDTO {
    private Long id;
    private String name;
    private Double longitude;
    private Double latitude;
    private String city;
    private String country;
    private String contact;
    private String phone;
    private String mission;
    private User admin;
    private OpeningHours openingHours;
}
