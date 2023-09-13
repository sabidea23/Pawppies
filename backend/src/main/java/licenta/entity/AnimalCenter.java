package licenta.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "animal_center")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnimalCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String name;

    private String description;
    private String location;

    @ManyToOne(fetch = FetchType.EAGER)
    private User admin;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Animal> animals;

    public AnimalCenter(String name, String description, String location, User admin) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.admin = admin;
    }
}

