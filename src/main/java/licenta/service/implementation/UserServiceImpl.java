package licenta.service.implementation;

import licenta.exeptions.UserAlreadyExists;
import licenta.exeptions.UserNotFoundException;
import licenta.model.Role;
import licenta.model.User;
import licenta.model.UserRole;
import licenta.repo.RoleRepository;
import licenta.repo.UserRepository;
import licenta.repo.UserRoleRepository;
import licenta.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final UserRoleRepository userRoleRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, UserRoleRepository userRoleRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User createUser(User user) throws UserAlreadyExists {
        if (this.userRepository.existsByUsername(user.getUsername())) {
            throw new UserAlreadyExists("User with username `" + user.getUsername() + "` already exists");
        }

        if (this.userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExists("User with email `" + user.getEmail() + "` already exists");
        }

        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        Set<UserRole> userRoleSet = new HashSet<>();
        Role role = this.roleRepository.findById(0L).get();
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        userRoleSet.add(userRole);
        user.setUserRoles(userRoleSet);
        return this.userRepository.save(user);
    }

    @Override
    public User updateUser(User user) throws UserNotFoundException {
        if (!this.userRepository.existsById(user.getId())) {
            throw new UserNotFoundException("User with id `" + user.getId() + "` not found");
        }

        return this.userRepository.save(user);
    }

    @Override
    public User updateUserRole(User user, Set<UserRole> userRoleSet) throws Exception {
        return null;
    }

    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }


    @Override
    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }
}
