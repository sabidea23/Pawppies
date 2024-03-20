package licenta.dto;

import licenta.entity.BreedDetails;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BreedDetailsResponseDTO {

    private String name;

    private String description;

    private String personality;

    private String history;

    private String health;

    private BreedDetails.AnimalType animalType;

    private String image;

    private String minHeight;

    private String maxHeight;

    private String minWeight;

    private String maxWeight;

    private Integer playfulness;

    private Integer groomingRequirements;

    private Integer friendlinessToOtherPets;

    private Integer friendlinessToChildren;

    private Integer activityLevel;

    private Integer vocality;

    private Integer intelligence;

    private Integer needForAttention;

    private Integer affectionForOwners;

    private Integer independence;

    private Integer watchfulness;

    private Integer exerciseRequirements;

    private Integer easeOfTraining;

    private Integer heatSensitivity;
}
