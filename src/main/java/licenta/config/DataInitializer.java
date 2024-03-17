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
        if (!roleRepository.existsById(0L)) {
            roleRepository.save(new Role(0L, "NORMAL"));
        }

        if (!roleRepository.existsById(1L)) {
            roleRepository.save(new Role(1L, "ADMIN"));
        }
    }
}
