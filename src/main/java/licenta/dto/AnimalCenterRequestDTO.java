package licenta.dto;

import licenta.entity.User;
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
    private String contact;
    private String country;
    private String phone;
    private String mission;
    private User admin;
}