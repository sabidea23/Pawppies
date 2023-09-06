package licenta.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "CLIENTS")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "iduser")
    private Long id;

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Integer age;
    private String email;
    private boolean enabled = true;
    private String profile;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "client")
    @JsonIgnore
    private Set<ClientType> clientTypes = new HashSet<>();

    //    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        Set<Authority> set = new HashSet<>();
//        this.userRoles.forEach(userRole -> {
//            set.add(new Authority(userRole.getRole().getRoleName()));
//        });
//        return set;
//    }
}
