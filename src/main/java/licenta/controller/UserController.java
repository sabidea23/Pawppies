package licenta.controller;

import licenta.dto.UserRequestDTO;
import licenta.dto.UserResponseDTO;
import licenta.entity.User;
import licenta.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


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

    @DeleteMapping("/{userId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable("userId") Long userid) {
        this.userService.deleteUser(userid);
    }
}
