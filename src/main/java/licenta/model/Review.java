package licenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(length = 3000)
    private String text;

    @NotNull
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private User author;

    @NotNull
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private University university;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY)
    private Set<Appreciator> appreciators = new HashSet<>();

    @JsonIgnore
    @ElementCollection
    private Set<Long> liked_by = new HashSet<>();

    @NotNull
    private int likes;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "review_images",
                joinColumns = {
            @JoinColumn(name = "review_id")
                },
    inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    })
    private Set<ImageModel> reviewImages;

    public Review(String text, User author, University university) {
        this.text = text;
        this.author = author;
        this.university = university;
        this.likes = 0;
    }

    public Set<ImageModel> getReviewImages() {
        return reviewImages;
    }

    public void setReviewImages(Set<ImageModel> reviewImages) {
        this.reviewImages = reviewImages;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @JsonIgnore
    public User getAuthor() {
        return author;
    }

    @JsonProperty("author")
    public void setAuthor(User author) {
        this.author = author;
    }

    @JsonIgnore
    public University getUniversity() {
        return university;
    }

    @JsonProperty("university")
    public void setUniversity(University university) {
        this.university = university;
    }

    @JsonProperty("likes")
    public int getLikes() {
        return likes;
    }

    public boolean addLike(Long userId) {
        boolean was_added = liked_by.add(userId);
        if (was_added) {
            // Successfully liked
            likes++;
        }

        return was_added;
    }

    public boolean removeLike(Long userId) {
        boolean was_removed = liked_by.remove(userId);
        if (was_removed) {
            likes--;
        }

        return was_removed;
    }

    public boolean isLikedBy(Long userId) {
        return liked_by.contains(userId);
    }
}
