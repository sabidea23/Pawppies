package licenta.dto;

import licenta.entity.ImageModel;
import licenta.entity.User;
import licenta.entity.AnimalCenter;
import licenta.entity.BreedDetails;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
public class AnimalResponseDTO {

    private Long id;
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
    private User author;
    private AnimalCenter animalCenter;
    private BreedDetails breedDetails;
    private Set<Long> liked_by;
    private int likes;
    private Set<ImageModel> animalImages;

    // Getters and setters for all the fields
}
