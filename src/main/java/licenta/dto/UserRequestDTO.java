package licenta.dto;

import licenta.entity.Role;
import licenta.entity.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserRequestDTO {
    private Long id;
    private  String username;
    private  String password;
    private String firstName;
    private  String lastName;
    private  String email;
    private  String phone;
    private  Double latitude;
    private  Double longitude;
    private String role;
    private String city;
    private String country;
    private String street;
    public UserRequestDTO(Long id, String username, String password, String firstName, String lastName, String email,
                          String phone, Double latitude, Double longitude, String role, String city, String country, String street) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.latitude = latitude;
        this.longitude = longitude;
        this.role = role;
        this.city = city;
        this.country = country;
        this.street = street;
    }
}

