package licenta.dto;

import licenta.entity.User;
import licenta.entity.AnimalCenter;
import licenta.entity.BreedDetails;
import licenta.entity.ImageModel;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
public class AnimalRequestDTO {

    private String name;
    private String age;
    private String gender;
    private String size;
    private String coatLength;
    private String type;
    private String health;
    private String care;
    private String color;
    private String description;
    private String goodInHome;
    private LocalDate postedDate;
    private Boolean isAdopted;
    private User author;  // Trimiterea întregului obiect User
    private AnimalCenter animalCenter;  // Trimiterea întregului obiect AnimalCenter
    private BreedDetails breedDetails;  // Trimiterea întregului obiect BreedDetails
    private Set<ImageModel> animalImages;  // Setul de imagini poate fi trimis dacă este necesar

    // Getters și setters pentru toate câmpurile
}
