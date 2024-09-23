package licenta.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column(length = 2000)
    String reason;

    @Column
    String firstName;
    @Column
    String lastName;
    @Column
    String email;
    @Column
    String phone;
    @Column
    LocalDateTime requestedDate;
    @Column
    LocalDateTime pendingDate;
    @Column
    String status; // submit, pending, approved, reject,
}
