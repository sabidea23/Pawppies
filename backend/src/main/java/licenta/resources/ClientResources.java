package licenta.resources;

import licenta.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientResources extends JpaRepository<Client, Long> {
    Client findByUsername(String username);

    Client getUserByUsername(String username);
}
