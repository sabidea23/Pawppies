package licenta.service.implementation;

import licenta.dto.UserRequestDTO;
import licenta.exeptions.UserAlreadyExists;
import licenta.exeptions.UserNotFoundException;
import licenta.entity.Role;
import licenta.entity.User;
import licenta.entity.UserRole;
import licenta.repo.RoleRepository;
import licenta.repo.UserRepository;
import licenta.repo.UserRoleRepository;
import licenta.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                           UserRoleRepository userRoleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User createUser(UserRequestDTO userRequest) throws UserAlreadyExists {

        if (this.userRepository.existsByUsername(userRequest.getUsername())) {
            throw new UserAlreadyExists("User with username `" + userRequest.getUsername() + "` already exists");
        }

        if (this.userRepository.existsByEmail(userRequest.getEmail())) {
            throw new UserAlreadyExists("User with email `" + userRequest.getEmail() + "` already exists");
        }

        String encodedPassword = this.bCryptPasswordEncoder.encode(userRequest.getPassword());

        User newUser = User.builder()
                .username(userRequest.getUsername())
                .password(encodedPassword)
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .phone(userRequest.getPhone())
                .latitude(userRequest.getLatitude())
                .longitude(userRequest.getLongitude())
                .recentlyViewedAnimals(new LinkedList<>())
                .userRoles(new HashSet<>())
                .animalCenters(new HashSet<>())
                .adoptedAnimals(new HashSet<>())
                .notifications(new HashSet<>())
                .adoptionRequests(new HashSet<>())
                .bestMatchAnimals(new HashSet<>())
                .build();

        User savedUser = this.userRepository.save(newUser);

        Role role = this.roleRepository.findByRoleName(userRequest.getRole());

        UserRole userRole = UserRole.builder()
                .user(savedUser)
                .role(role)
                .build();

        savedUser.getUserRoles().add(userRole);
        return this.userRepository.save(savedUser);
    }

    @Override
    public User updateUser(UserRequestDTO userRequestDTO) throws UserNotFoundException {

        User user = userRepository.findByUsername(userRequestDTO.getUsername());
        if (user == null) {
            throw new UserNotFoundException("User not found with username: " + userRequestDTO.getUsername());
        }

        user.setFirstName(userRequestDTO.getFirstName());
        user.setLastName(userRequestDTO.getLastName());
        user.setEmail(userRequestDTO.getEmail());
        user.setPhone(userRequestDTO.getPhone());
        user.setLatitude(userRequestDTO.getLatitude());
        user.setLongitude(userRequestDTO.getLongitude());
        user.setStreet(userRequestDTO.getStreet());
        user.setCity(userRequestDTO.getCity());
        user.setCountry(userRequestDTO.getCountry());

        if (userRequestDTO.getPassword() != null && !userRequestDTO.getPassword().isEmpty()) {
            user.setPassword(this.bCryptPasswordEncoder.encode(userRequestDTO.getPassword()));
        }

        return this.userRepository.save(user);
    }


    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    @Transactional
    public User updateUserRole(User user, Set<UserRole> userRoleSet) throws UserNotFoundException {
        if (!this.userRepository.existsById(user.getId())) {
            throw new UserNotFoundException("User with id `" + user.getId() + "` not found");
        }

        Set<UserRole> existingUserRoles = user.getUserRoles();
        this.userRoleRepository.deleteAll(existingUserRoles);

        for (UserRole role: userRoleSet) {
            this.roleRepository.save(role.getRole());
        }

        user.setUserRoles(userRoleSet);

        return this.userRepository.save(user);
    }

    @Override
    public void addRecentlyViewedAnimal(Long userId, Long animalId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User with id `" + userId + "` not found");
        }

        if (user.getRecentlyViewedAnimals() == null) {
            user.setRecentlyViewedAnimals(new LinkedList<>());
        }

        if (!user.getRecentlyViewedAnimals().contains(animalId)) {
            if (user.getRecentlyViewedAnimals().size() >= 5) {
                user.getRecentlyViewedAnimals().remove(0);
            }
            user.getRecentlyViewedAnimals().add(animalId);
            userRepository.save(user);
        }
    }

    @Override
    public List<Long> getRecentlyViewedAnimals(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User with id `" + userId + "` not found");
        }
        return new LinkedList<>(user.getRecentlyViewedAnimals());
    }
}
