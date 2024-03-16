package licenta.service.implementation;

import licenta.exeptions.UserAlreadyExists;
import licenta.exeptions.UserNotFoundException;
import licenta.model.Role;
import licenta.model.User;
import licenta.repo.RoleRepository;
import licenta.repo.UserRepository;
import licenta.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                           RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public User createUser(User user) throws UserAlreadyExists {

        if (this.userRepository.existsByUsername(user.getUsername())) {
            throw new UserAlreadyExists("User with username `" + user.getUsername() + "` already exists");
        }

        if (this.userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExists("User with email `" + user.getEmail() + "` already exists");
        }

       // Securitate
//        Principiul Celui Mai Mic Privilegiu: Utilizatorii ar trebui să aibă doar acele permisiuni strict necesare
//        pentru activitățile lor.
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        //ADAUGARE ROL USER BY DEFAULT
        Optional<Role> normalRole = roleRepository.findById("USER");

        Set<Role> roles = new HashSet<>();
        normalRole.ifPresent(roles::add);
        user.setRole(roles);

        return this.userRepository.save(user);
    }

    @Override
    public User updateUser(User requestBodyUser) throws UserNotFoundException {
        User originalUser = getUserByUsername(requestBodyUser.getUsername());
        if (originalUser == null) {
            throw new UserNotFoundException("User with username `" + requestBodyUser.getUsername() + "` not found");
        }

        originalUser.setFirstName(requestBodyUser.getFirstName());
        originalUser.setLastName(requestBodyUser.getLastName());
        originalUser.setEmail(requestBodyUser.getEmail());
        originalUser.setPhone(requestBodyUser.getPhone());
        originalUser.setLatitude(requestBodyUser.getLatitude());
        originalUser.setLongitude(requestBodyUser.getLongitude());

        if (requestBodyUser.getPassword() != null && !requestBodyUser.getPassword().isEmpty()) {
            originalUser.setPassword(this.bCryptPasswordEncoder.encode(requestBodyUser.getPassword()));
        }

        return this.userRepository.save(originalUser);
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
