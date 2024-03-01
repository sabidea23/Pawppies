package licenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "animal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(length = 3000)
    private String name;

    @NotNull
    @Column()
    private Integer age;

    @NotNull
    @Column()
    private String breed;

    @NotNull
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private User author;

    @NotNull
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private AnimalCenter animalCenter;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "breed_detail_id")
    @NotNull
    private BreedDetails breedDetails;

    @JsonIgnore
    @ElementCollection
    private Set<Long> liked_by = new HashSet<>();

    @NotNull
    private int likes;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "review_images", joinColumns = {@JoinColumn(name = "review_id")}, inverseJoinColumns = {@JoinColumn(name = "image_id")})
    private Set<ImageModel> reviewImages;

    @JsonIgnore
    public User getAuthor() {
        return author;
    }

    @JsonProperty("author")
    public void setAuthor(User author) {
        this.author = author;
    }

    @JsonIgnore
    public AnimalCenter getUniversity() {
        return animalCenter;
    }

    @JsonProperty("university")
    public void setUniversity(AnimalCenter university) {
        this.animalCenter = university;
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
