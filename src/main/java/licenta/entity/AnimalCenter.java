package licenta.entity;

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

    @Column(length = 2000)
    @NotNull
    private String mission;

    @Column()
    @NotNull
    private String country;

    @Column()
    @NotNull
    private String contact;

    @Column()
    @NotNull
    private String phone;
    
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private User admin;

    @OneToMany(mappedBy = "animalCenter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Animal> animals;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "opening_hours_id", referencedColumnName = "id")
    @JsonIgnore
    private OpeningHours openingHours;
}

