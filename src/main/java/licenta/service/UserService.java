package licenta.service;

import licenta.model.User;
import licenta.model.UserRole;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface UserService {

    //create user
    User createUser(User user, Set<UserRole> userRoleSet) throws Exception;

    // update user
    User updateUser(User user) throws Exception;

    // update user role
    User updateUserRole(User user, Set<UserRole> userRoleSet) throws Exception;

     //get user
    User getUser(String username);

    //get all users
    List<User> getUsers();

    //get user by username
    User getUserByUsername(String username);

    //delete user by id
    void deleteUser(Long userId);
}
