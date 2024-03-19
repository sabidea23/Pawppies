package licenta.service.implementation;

import licenta.dto.UserRequestDTO;
import licenta.exeptions.UserAlreadyExists;
import licenta.exeptions.UserNotFoundException;
import licenta.entity.Role;
import licenta.entity.User;
import licenta.entity.UserRole;
import licenta.repo.RoleRepository;
import licenta.repo.UserRepository;
import licenta.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
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

        // Crearea userului cu builder
        User newUser = User.builder()
                .username(userRequest.getUsername())
                .password(encodedPassword)
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .phone(userRequest.getPhone())
                .latitude(userRequest.getLatitude())
                .longitude(userRequest.getLongitude())
                .userRoles(new HashSet<>()) // Inițializează setul pentru a evita NullPointerException
                .build();

        // Salvarea userului pentru a-i genera un ID
        User savedUser = this.userRepository.save(newUser);

        // Găsirea rolului și crearea UserRole folosind builder-ul, dacă este disponibil
        Role role = this.roleRepository.findById(0L).orElseThrow(() -> new RuntimeException("Role not found"));

        UserRole userRole = UserRole.builder()
                .user(savedUser)
                .role(role)
                .build();

        // Adăugarea UserRole la user și salvarea modificărilor
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
    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }
}
