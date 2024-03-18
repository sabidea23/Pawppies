package licenta.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "role_app")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    private Long roleId;

    private String roleName;
}
