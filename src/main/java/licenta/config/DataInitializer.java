package licenta.config;

import javax.annotation.PostConstruct;
import licenta.model.Role;
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
        if (!roleRepository.existsById("USER")) {
            roleRepository.save(new Role("USER", "Role for default user"));
        }

        if (!roleRepository.existsById("ADMIN")) {
            roleRepository.save(new Role("ADMIN", "Role for admin user"));
        }
    }
}
