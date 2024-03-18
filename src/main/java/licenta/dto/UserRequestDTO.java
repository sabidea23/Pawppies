package licenta.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRequestDTO {
    private  String username;
    private  String password;
    private String firstName;
    private  String lastName;
    private  String email;
    private  String phone;
    private  Double latitude;
    private  Double longitude;

    public UserRequestDTO(String username, String password, String firstName, String lastName, String email,
                          String phone, Double latitude, Double longitude) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
