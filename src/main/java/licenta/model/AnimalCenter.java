package licenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "animal_center")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimalCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String name;
    private Double longitude;
    private Double latitude;
    private String city;
    private String country;
    private String contact;
    @ManyToOne(fetch = FetchType.EAGER)
    private User admin;
    @OneToMany(mappedBy = "animalCenter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Animal> animals;
}

