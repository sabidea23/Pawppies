package licenta.resources;


import licenta.entity.AnimalCenter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalCenterRepository extends JpaRepository<AnimalCenter, Long> {

    boolean existsByName(String name);
}
