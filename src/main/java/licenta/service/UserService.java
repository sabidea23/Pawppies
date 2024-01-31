package licenta.service;

import licenta.model.User;
import licenta.model.UserRole;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface UserService {

    User createUser(User user, Set<UserRole> userRoleSet) throws Exception;

    User updateUser(User user) throws Exception;

    User updateUserRole(User user, Set<UserRole> userRoleSet) throws Exception;

    User getUser(String username);
    List<User> getUsers();

    User getUserByUsername(String username);

    void deleteUser(Long userId);
}
