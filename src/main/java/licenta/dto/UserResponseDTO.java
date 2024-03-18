package licenta.dto;

import licenta.model.UserRole;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Builder
@Data
public class UserResponseDTO {
    private Long id;
    private String username;
    private Double latitude;
    private Double longitude;
    private Set<UserRole> userRole;

    public UserResponseDTO(Long id, String username, Double latitude, Double longitude, Set<UserRole> userRole) {
        this.id = id;
        this.username = username;
        this.latitude = latitude;
        this.longitude = longitude;
        this.userRole = userRole;
    }
}
