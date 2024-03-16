package licenta.controller;

import licenta.exeptions.UserNotFoundException;
import licenta.model.User;
import licenta.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(code = HttpStatus.CREATED)
    public User createUser(@RequestBody User user) throws Exception {
        return this.userService.createUser(user);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public User updateUser(@RequestBody User requestBodyUser) throws Exception {
        return this.userService.updateUser(requestBodyUser);
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
