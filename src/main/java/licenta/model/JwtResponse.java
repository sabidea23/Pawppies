package licenta.model;

import lombok.Data;

@Data
public class JwtResponse {
    private String jwtToken;

    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}
