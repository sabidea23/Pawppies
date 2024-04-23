package licenta.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpeningHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String mondayOpen;

    private String mondayClose;

    private String tuesdayOpen;
    private String tuesdayClose;

    private String wednesdayOpen;
    private String wednesdayClose;

    private String thursdayOpen;
    private String thursdayClose;
    private String fridayOpen;
    private String fridayClose;
    private String saturdayOpen;
    private String saturdayClose;
    private String sundayOpen;
    private String sundayClose;
}
