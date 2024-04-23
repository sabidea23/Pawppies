package licenta.controller;

import licenta.config.JwtUtils;
import licenta.dto.UserResponseDTO;
import licenta.entity.JwtRequest;
import licenta.entity.JwtResponse;
import licenta.entity.User;
import licenta.exeptions.InvalidCredentials;
import licenta.service.implementation.UserDetailsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImpl userDetailsService;

    private final JwtUtils jwtUtils;

    public AuthenticateController(AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws InvalidCredentials {
        try {
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        } catch (InvalidCredentials e) {
            e.printStackTrace();
            throw new InvalidCredentials("Invalid Credentials!");
        }

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    public void authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            throw new InvalidCredentials("Invalid credentials " + e.getMessage());
        }
    }

    @GetMapping("/current-user")
    public UserResponseDTO getCurrentUser(Principal principal) {
        User user = this.userDetailsService.loadUserByUsername(principal.getName());

        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();

        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .longitude(user.getLongitude())
                .latitude(user.getLatitude())
                .recentlyViewedAnimals(user.getRecentlyViewedAnimals())
                .animalCenters(user.getAnimalCenters())
                .userRoles(user.getUserRoles())
                .authorities(authorities)
                .adoptedAnimals(user.getAdoptedAnimals())
                .city(user.getCity())
                .country(user.getCountry())
                .street(user.getStreet())
                .notifications(user.getNotifications())
                .adoptionRequests(user.getAdoptionRequests())
                .bestMatchAnimals(user.getBestMatchAnimals())
                .preferences(user.getAnimalPreferences())
                .build();
    }
}
