package licenta.dto;

import licenta.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class AnimalCenterRequestDTO {
    private Long id;
    private String name;
    private Double longitude;
    private Double latitude;
    private String city;
    private String country;
    private String contact;
    private String mission;
    private User admin;
}