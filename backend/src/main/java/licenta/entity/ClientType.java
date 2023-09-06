package licenta.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "CLIENTS_TYPE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long clientTypeId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Client client;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Type type;
}
