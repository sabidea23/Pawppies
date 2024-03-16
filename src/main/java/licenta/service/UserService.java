package licenta.service;

import licenta.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {

    User createUser(User user) throws Exception;

    User updateUser(User user) throws Exception;

    User getUser(String username);
    List<User> getUsers();

    User getUserByUsername(String username);

    void deleteUser(Long userId);
}
