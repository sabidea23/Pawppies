package licenta.dto;

import licenta.entity.Animal;
import licenta.entity.AnimalCenter;
import licenta.entity.UserRole;
import org.springframework.security.core.GrantedAuthority;
import lombok.Builder;
import lombok.Data;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Builder
@Data
public class UserResponseDTO {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Double longitude;
    private Double latitude;
    private List<Long> recentlyViewedAnimals;
    private Set<AnimalCenter> animalCenters;
    private Set<UserRole> userRoles;
    private Collection<? extends GrantedAuthority> authorities; // Inclusiv autoritățile
    private Set<Animal> adoptedAnimals;
    private String city;
    private String country;
    private String street;
}
