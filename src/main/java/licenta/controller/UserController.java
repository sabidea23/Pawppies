package licenta.controller;

import licenta.exeptions.UserNotFoundException;
import licenta.model.User;
import licenta.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public User createUser(@RequestBody User user) throws Exception {
        return this.userService.createUser(user);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public User updateUser(@RequestBody User requestBodyUser) throws Exception {
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

        return this.userService.updateUser(originalUser);
    }


    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<User> getAllUsers() {
        return this.userService.getUsers();
    }

    @GetMapping("/{username}")
    @ResponseStatus(code = HttpStatus.OK)
    public User getUserByUsername(@PathVariable("username") String username) {
        return this.userService.getUserByUsername(username);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable("userId") Long userid) {
        this.userService.deleteUser(userid);
    }
}
