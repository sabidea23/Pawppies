package licenta.service;

import licenta.entity.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {

    Role createNewRole(Role role);

    List<Role> getAllRoles();
}
