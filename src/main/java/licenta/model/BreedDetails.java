package licenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "breed_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BreedDetails {
    public enum AnimalType {
        DOG, CAT
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(length = 3000)
    private String name;

    @NotNull
    @Column()
    private String description;

    @NotNull
    @Column()
    private String personality;

    @NotNull
    @Column()
    private String history;

    @NotNull
    @Column()
    private String health;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column()
    private AnimalType animalType;

    @NotNull
    @Column()
    private String image;

    @NotNull
    @Column()
    private String minHeight;

    @NotNull
    @Column()
    private String maxHeight;

    @NotNull
    @Column()
    private String minWeight;

    @NotNull
    @Column()
    private String maxWeight;

    //TABLE -----
    @NotNull
    @Column()
    private Integer playfulness;

    @NotNull
    @Column()
    private Integer groomingRequirements;

    @NotNull
    @Column()
    private Integer friendlinessToOtherPets;

    @NotNull
    @Column()
    private Integer friendlinessToChildren;

    @NotNull
    @Column()
    private Integer activityLevel;

    @NotNull
    @Column()
    private Integer vocality;

    @NotNull
    @Column()
    private Integer intelligence;

    //only cats
    @NotNull
    @Column()
    private Integer needForAttention;

    @NotNull
    @Column()
    private Integer affectionForOwners;

    @NotNull
    @Column()
    private Integer independence;
    
    // DOAR PENTRU CAINI
    @NotNull
    @Column()
    private Integer watchfulness;

    @NotNull
    @Column()
    private Integer exerciseRequirements;

    @NotNull
    @Column()
    private Integer easeOfTraining;

    @NotNull
    @Column()
    private Integer heatSensitivity;

    @OneToMany(mappedBy = "breedDetails", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Animal> animals;
}
