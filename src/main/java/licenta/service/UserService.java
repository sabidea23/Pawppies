package licenta.service;

import licenta.dto.UserRequestDTO;
import licenta.entity.User;


public interface UserService {

    User createUser(UserRequestDTO user) throws Exception;

    User updateUser(UserRequestDTO user) throws Exception;

    User getUser(String username);

    User getUserByUsername(String username);

    void deleteUser(Long userId);
}
