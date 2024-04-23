package licenta.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Preferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //aspect
    private String age;
    private String size;
    private String gender;
    private String coatLength;

    //compatibilitate cu stilul de viata
    private String activityLevel; //or playfullness
    private Boolean friendlinessToChildren;
    private Boolean friendlinessToOtherAnimals;
    private Boolean affectionForOwners;
    private String groomingRequirements;


    //sanatate
    private Boolean hasSpecialNeeds;
    private Boolean isFullyVaccinated;

    private String type;    //dog or cat

    //CAINI
    private Boolean isTrained;

    //„Cât exercițiu fizic crezi că poți oferi zilnic câinelui?”
    private String exerciseRequirements;

    //„Îți dorești un câine care este un bun paznic?”
    private Boolean watchfulness;
    
    //PISICI
    private Boolean independence;

    //Cât de mult timp ești dispus să petreci jucându-te și ocupându-te de pisică zilnic?”
    private String needForAttention;

    //„Îți dorești o pisică care să fie foarte inteligentă și curioasă?”
    private Boolean intelligence;
}
