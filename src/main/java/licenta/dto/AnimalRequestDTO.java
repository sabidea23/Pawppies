package licenta.dto;

import com.sun.istack.NotNull;
import licenta.entity.AnimalCenter;
import licenta.entity.BreedDetails;
import licenta.entity.ImageModel;
import licenta.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
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
    
    private User author;
    
    private AnimalCenter animalCenter;
    
    private BreedDetails breedDetails;
    
    private Set<Long> liked_by;
    private Set<ImageModel> animalImages;
}
