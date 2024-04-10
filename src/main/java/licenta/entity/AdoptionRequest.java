package licenta.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "adoption_reequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    User adoptionRequestUser;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    Animal adoptionRequestAnimal;

    String reason;
    String firstName;
    String lastName;
    String email;
    String phone;
    LocalDate requestedDate;
    String status; //pending, approved, denied
}
