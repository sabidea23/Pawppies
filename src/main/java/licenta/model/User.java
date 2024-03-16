package licenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_app")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLE_APP",
            joinColumns = {
                    @JoinColumn(name = "USER_ID")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "ROLE_ID")
            }
    )
    private Set<Role> role;

    @NotNull
    @Column
    private String username;

    @NotNull
    @Column
    private String password;

    @NotNull
    @Column
    private String firstName;

    @NotNull
    @Column
    private String lastName;

    @NotNull
    @Column
    private String email;

    @NotNull
    @Column
    private String phone;

    @NotNull
    @Column
    private boolean enabled = true;

    @NotNull
    @Column
    private Double longitude;

    @NotNull
    @Column
    private Double latitude;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Animal> animals = new HashSet<>();
}
