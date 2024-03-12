package licenta.service.implementation;

import licenta.model.Role;
import licenta.repo.RoleRepository;
import licenta.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleDao) {
        this.roleRepository = roleDao;
    }

    public Role createNewRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
