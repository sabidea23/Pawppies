package licenta.dto;

import com.sun.istack.NotNull;
import licenta.entity.AnimalCenter;
import licenta.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
public class AnimalRequestDTO {
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String age;
    @NotNull
    private String gender;
    @NotNull
    private String size;
    @NotNull
    private String coatLength;
    @NotNull
    private String type;
    @NotNull
    private String health;
    @NotNull
    private String care;
    @NotNull
    private String color;
    @NotNull
    private String description;
    @NotNull
    private String goodInHome;
    @NotNull
    private LocalDate postedDate;
    @NotNull
    private Boolean isAdopted;
    @NotNull
    private User author;
    @NotNull
    private AnimalCenter animalCenter;
    @NotNull
    private Long breedDetails;
    private Set<Long> liked_by;
}
