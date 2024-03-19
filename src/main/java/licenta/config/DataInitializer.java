package licenta.config;

import javax.annotation.PostConstruct;
import licenta.entity.Role;
import licenta.entity.User;
import licenta.entity.UserRole;
import licenta.repo.RoleRepository;
import licenta.repo.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class DataInitializer {

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostConstruct
    public void initData() {
        if (!roleRepository.existsById(0L)) {
            Role role = Role.builder()
                            .roleId(0L)
                            .roleName("NORMAL")
                            .build();
            roleRepository.save(role);
        }

        if (!roleRepository.existsById(1L)) {
            Role role = Role.builder()
                    .roleId(1L)
                    .roleName("SUPPLIER")
                    .build();
            roleRepository.save(role);
        }
        
        if (!roleRepository.existsById(2L)) {
            Role role = Role.builder()
                    .roleId(2L)
                    .roleName("ADMIN")
                    .build();
            roleRepository.save(role);

            String encodedPassword = this.bCryptPasswordEncoder.encode("Adminadmin23");
            User newUser = User.builder()
                    .username("admin")
                    .password(encodedPassword)
                    .firstName("admin")
                    .lastName("admin")
                    .email("dinu.sabina18@gmail.com")
                    .phone("0735116377")
                    .userRoles(new HashSet<>())
                    .build();

            User savedUser = this.userRepository.save(newUser);

            UserRole userRole = UserRole.builder()
                    .user(savedUser)
                    .role(role)
                    .build();

            savedUser.getUserRoles().add(userRole);
            this.userRepository.save(savedUser);
        }
    }
}
