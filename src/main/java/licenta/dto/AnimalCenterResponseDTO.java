package licenta.dto;

import licenta.model.AnimalCenter;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnimalCenterResponseDTO {
    private Long id;
    private String name;
    private Double longitude;
    private Double latitude;
    private String city;
    private String country;
    private String contact;
    private String mission;

    public AnimalCenterResponseDTO(AnimalCenter animalCenter) {
        this.id = animalCenter.getId();
        this.name = animalCenter.getName();
        this.longitude = animalCenter.getLongitude();
        this.latitude = animalCenter.getLatitude();
        this.city = animalCenter.getCity();
        this.country = animalCenter.getCountry();
        this.contact = animalCenter.getContact();
        this.mission = animalCenter.getMission();
    }
}
