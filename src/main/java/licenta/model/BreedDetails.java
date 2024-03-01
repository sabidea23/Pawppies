package licenta.model;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;
import org.checkerframework.checker.nullness.qual.NonNull;


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
    @Column(name = "id", nullable = false)
    private Long id;

   @NonNull
    @Column(length = 3000)
    private String name;

   @NonNull
    @Column()
    private String description;

   @NonNull
    @Column()
    private String personality;

   @NonNull
    @Column()
    private String history;

   @NonNull
    @Column()
    private String health;

   @NonNull
    @Enumerated(EnumType.ORDINAL)
    @Column()
    private AnimalType animalType;

   @NonNull
    @Column()
    private String image;

   @NonNull
    @Column()
    private String minHeight;

   @NonNull
    @Column()
    private String maxHeight;

   @NonNull
    @Column()
    private String minWeight;

   @NonNull
    @Column()
    private String maxWeight;

    //TABLE -----
   @NonNull
    @Column()
    private Integer playfulness;

   @NonNull
    @Column()
    private Integer groomingRequirements;

   @NonNull
    @Column()
    private Integer friendlinessToOtherPets;

   @NonNull
    @Column()
    private Integer friendlinessToChildren;

   @NonNull
    @Column()
    private Integer activityLevel;

   @NonNull
    @Column()
    private Integer vocality;

   @NonNull
    @Column()
    private Integer intelligence;

    //only cats
   @NonNull
    @Column()
    private Integer needForAttention;

   @NonNull
    @Column()
    private Integer affectionForOwners;

   @NonNull
    @Column()
    private Integer independence;
    
    // DOAR PENTRU CAINI
   @NonNull
    @Column()
    private Integer watchfulness;

   @NonNull
    @Column()
    private Integer exerciseRequirements;

   @NonNull
    @Column()
    private Integer easeOfTraining;

   @NonNull
    @Column()
    private Integer heatSensitivity;
}
