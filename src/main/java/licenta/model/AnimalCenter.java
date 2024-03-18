package licenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    @NotNull
    private String name;

    @Column()
    @NotNull
    private Double longitude;

    @Column()
    @NotNull
    private Double latitude;

    @Column()
    @NotNull
    private String city;

    @Column()
    @NotNull
    private String mission;

    @Column()
    @NotNull
    private String country;

    @Column()
    @NotNull
    private String contact;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private User admin;

    @OneToMany(mappedBy = "animalCenter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Animal> animals;
}

