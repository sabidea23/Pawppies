package licenta.service;

import licenta.dto.UserRequestDTO;
import licenta.entity.User;
import licenta.entity.UserRole;

import java.util.List;
import java.util.Set;


public interface UserService {

    User createUser(UserRequestDTO user) throws Exception;

    User updateUser(UserRequestDTO user) throws Exception;

    User getUser(String username);

    List<User> getUsers();


    User getUserByUsername(String username);

    void deleteUser(Long userId);

    User updateUserRole(User user, Set<UserRole> userRoleSet);

    void addRecentlyViewedAnimal(Long userId, Long animalId);

    List<Long> getRecentlyViewedAnimals(Long userId);
}