package licenta.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Table(name = "user_app")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    @NotNull
    private String username;

    @Column
    @NotNull
    private String password;

    @Column
    @NotNull
    private String firstName;

    @Column
    @NotNull
    private String lastName;

    @Column(unique = true)
    @NotNull
    private String email;

    @Column
    private String phone;

    @Column
    @NotNull
    private Double longitude;

    @Column
    @NotNull
    private Double latitude;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "admin")
    @JsonIgnore
    private Set<AnimalCenter> animalCenters = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    @JsonIgnore
    private Set<UserRole> userRoles = new HashSet<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> set = new HashSet<>();
        this.userRoles.forEach(userRole -> {
            set.add(new Authority(userRole.getRole().getRoleName()));
        });
        return set;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @JsonIgnore
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Long> recentlyViewedAnimals = new ArrayList<>();


    public boolean viewAnimal(Long animalId) {
        recentlyViewedAnimals.remove(animalId);

        while (recentlyViewedAnimals.size() >= 5) {
            recentlyViewedAnimals.remove(0);
        }
        return recentlyViewedAnimals.add(animalId);
    }
}
