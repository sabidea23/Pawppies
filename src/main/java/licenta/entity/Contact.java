package licenta.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "contact_form")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String firstName;

    @Column(length = 150, nullable = false)
    private String email;

    @Column(length = 300)
    private String subject;

    @Column(length = 2000)
    private String message;

    private LocalDateTime postedDate;
}