package licenta.resources;

import licenta.entity.ClientType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientTypeResource extends JpaRepository<ClientType, Long> {
}
