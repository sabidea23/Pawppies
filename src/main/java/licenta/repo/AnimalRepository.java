package licenta.repo;

import licenta.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    boolean existsByUniversityId(Long universityId);

    boolean existsByAuthorId(Long authorId);

    boolean existsByUniversityIdAndAuthorId(Long universityId, Long authorId);

    List<Animal> findAllByUniversityId(Long universityId);

    List<Animal> findAllByAuthorId(Long authorId);

    List<Animal> findAllByUniversityIdAndAuthorId(Long universityId, Long authorId);
}
