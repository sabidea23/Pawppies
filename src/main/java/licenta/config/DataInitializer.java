package licenta.config;

import javax.annotation.PostConstruct;
import licenta.entity.Role;
import licenta.repo.RoleRepository;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
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
                    .roleName("ADMIN")
                    .build();
            roleRepository.save(role);
        }
    }
}
