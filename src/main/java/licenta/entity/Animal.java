package licenta.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
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

    @NotNull
    @Column(length = 100)
    private String name;

    @NotNull
    @Column()
    private String age;

    @NotNull
    @Column(length = 300)
    private String gender;

    @NotNull
    @Column(length = 100)
    private String size;

    @NotNull
    @Column(length = 100)
    private String coatLength;

    @NotNull
    @Column(length = 2000)
    private String type;
    
    @NotNull
    @Column(length = 2000)
    private String health;

    @NotNull
    @Column(length = 2000)
    private String care;

    @NotNull
    @Column(length = 100)
    private String color;

    @NotNull
    @Column(length = 2000)
    private String description;

    @NotNull
    @Column(length = 100)
    private String goodInHome;

    @NotNull
    @Column()
    private LocalDate postedDate;

    @NotNull
    @Column()
    private Boolean isAdopted;

    @NotNull
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private User author;

    @NotNull
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private AnimalCenter animalCenter;

    @NotNull
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "breed_details_id")
    private BreedDetails breedDetails;

    @JsonIgnore
    @ElementCollection
    private Set<Long> liked_by = new HashSet<>();

    @NotNull
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
}
