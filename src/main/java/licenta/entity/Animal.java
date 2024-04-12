package licenta.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "animal")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 100)
    private String name;

    @Column()
    private String age;

    @Column(length = 300)
    private String gender;

    @Column(length = 100)
    private String size;

    @Column(length = 100)
    private String coatLength;

    private String type;
    
    @Column(length = 1000)
    private String health;

    @Column(length = 100)
    private String color;

    @Column(length = 2000)
    private String description;

    @Column(length = 100)
    private String goodInHome;

    @Column()
    private LocalDateTime postedDate;

    @Column()
    private Boolean isAdopted;

    @Column()
    private Boolean isFullyVaccinated;

    @Column(length = 1000)
    private String vaccinationDetails;
    
    @Column()
    private Boolean isTrained;

    @Column(length = 1000)
    private String trainedDetails;

    @Column()
    private Boolean hasSpecialNeeds;

    @Column(length = 1000)
    private String specialNeedsDetails;

    @Column()
    private Boolean sheds;

    @Column(length = 100)
    private String maintenanceCosts;

    @Column(length = 1000)
    private String preferredFoodDescription;

    @Column
    private Boolean hasPreviousOwners;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private User author;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private AnimalCenter animalCenter;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "breed_details_id")
    private BreedDetails breedDetails;

    @JsonIgnore
    @ElementCollection
    private Set<Long> liked_by = new HashSet<>();

    private int likes;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "animal_images", joinColumns = {@JoinColumn(name = "animal_id")}, inverseJoinColumns = {@JoinColumn(name = "image_id")})
    private Set<ImageModel> animalImages;

    @JsonIgnore
    public User getAuthor() {
        return author;
    }

    @JsonProperty("author")
    public void setAuthor(User author) {
        this.author = author;
    }

    @JsonIgnore
    public AnimalCenter getAnimalCenter() {
        return animalCenter;
    }

    @JsonIgnore
    public BreedDetails getBreedDetails() {
        return breedDetails;
    }

    @JsonProperty("animalCenter")
    public void setAnimalCenter(AnimalCenter animalCenter) {
        this.animalCenter = animalCenter;
    }

    @JsonProperty("breedDetails")
    public void setBreedDetails(BreedDetails breedDetails) {
        this.breedDetails = breedDetails;
    }
    
    @JsonProperty("likes")
    public int getLikes() {
        return likes;
    }

    public boolean addLike(Long userId) {
        boolean was_added = liked_by.add(userId);
        if (was_added) {
            likes++;
        }

        return was_added;
    }

    public void removeLike(Long userId) {
        boolean was_removed = liked_by.remove(userId);
        if (was_removed) {
            likes--;
        }
    }

    public boolean isLikedBy(Long userId) {
        return liked_by.contains(userId);
    }

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private User adoptionUser;

    @OneToMany(mappedBy = "adoptionRequestAnimal", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<AdoptionRequest> adoptionRequests;
}
