package licenta.dto;

import licenta.entity.ImageModel;
import licenta.entity.User;
import licenta.entity.AnimalCenter;
import licenta.entity.BreedDetails;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
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
    private String color;
    private String description;
    private String goodInHome;
    private LocalDateTime postedDate;
    private Boolean isAdopted;
    private User author;
    private AnimalCenter animalCenter;
    private BreedDetails breedDetails;
    private Set<Long> liked_by;
    private int likes;
    private Set<ImageModel> animalImages;

    private Boolean isFullyVaccinated;
    private String vaccinationDetails;
    private Boolean isTrained;
    private String trainedDetails;
    private Boolean hasSpecialNeeds;
    private String specialNeedsDetails;
    private Boolean sheds;
    private String maintenanceCosts;
    private String preferredFoodDescription;
    private Boolean hasPreviousOwners;
}
