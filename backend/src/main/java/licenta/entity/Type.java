package licenta.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "TYPE")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Type {
    @Id
    private Long typeId;

    private String typeName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "type")
    private Set<ClientType> userRole = new HashSet<>();
}
