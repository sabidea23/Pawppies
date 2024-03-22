package licenta.controller;

import licenta.dto.UserRequestDTO;
import licenta.dto.UserResponseDTO;
import licenta.entity.Role;
import licenta.entity.User;
import licenta.entity.UserRole;
import licenta.exeptions.UserNotFoundException;
import licenta.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public User createUser(@RequestBody UserRequestDTO user) throws Exception {
        return this.userService.createUser(user);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public User updateUser(@RequestBody UserRequestDTO requestBodyUser) throws Exception {
        return this.userService.updateUser(requestBodyUser);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public List<User> getAllUsers() {
        return this.userService.getUsers();
    }
    
    @GetMapping("/{username}")
    @ResponseStatus(code = HttpStatus.OK)
    public UserResponseDTO getUserByUsername(@PathVariable("username") String username) {
        User user = this.userService.getUserByUsername(username);
        return  UserResponseDTO.builder()
                .userRole(user.getUserRoles())
                .username(user.getUsername())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .build();
    }


    @PutMapping("/{username}/role/{roleName}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public User updateUserRole(@PathVariable("username") String username, @PathVariable("roleName") String roleName) {
        User user = this.userService.getUserByUsername(username);
        if (user == null) {
            throw new UserNotFoundException("User with username `" + username + "` not found");
        }

        Set<UserRole> userRoleSet = new HashSet<>();
        Role role = new Role();

        role.setRoleId((roleName.equals("NORMAL")) ? 0L : 1L);
        role.setRoleName(roleName);

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        userRoleSet.add(userRole);

        return this.userService.updateUserRole(user, userRoleSet);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable("userId") Long userid) {
        this.userService.deleteUser(userid);
    }
}
