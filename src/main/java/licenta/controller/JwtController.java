package licenta.controller;


import licenta.model.JwtRequest;
import licenta.model.JwtResponse;
import licenta.model.User;
import licenta.repo.UserRepository;
import licenta.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class JwtController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping({"/generate-token"})
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return jwtService.createJwtToken(jwtRequest);
    }

    @GetMapping("/current-user")
    public User getCurrentUser() {
        // Obține principalul curent din contextul de securitate
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Verifică dacă principalul este o instanță de UserDetails
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            UserDetails userDetails =  jwtService.loadUserByUsername(username);
           return userRepository.findByUsername(userDetails.getUsername());

        } else {
            // Principalul nu este instanță de UserDetails, gestionează cazul corespunzător
            throw new IllegalStateException("Principalul curent nu este instanță de UserDetails");
        }
    }
}