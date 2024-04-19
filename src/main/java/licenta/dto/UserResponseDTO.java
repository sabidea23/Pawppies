package licenta.dto;

import licenta.entity.*;
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
    private String city;
    private String country;
    private String street;
    private Set<Long> recentlyViewedAnimals;
    private Set<AnimalCenter> animalCenters;
    private Set<UserRole> userRoles;
    private Collection<? extends GrantedAuthority> authorities;
    private Set<Animal> adoptedAnimals;
    private Set<Animal> bestMatchAnimals;
    private Set<AdoptionRequest> adoptionRequests;
    private Set<Notification> notifications;
}
