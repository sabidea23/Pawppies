package licenta.repo;

import licenta.model.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, Long> {
    University findByName(String name);

    boolean existsByName(String name);
}
