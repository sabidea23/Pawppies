package licenta.repo;

import licenta.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    boolean existsByAnimalCenterId(Long animalCenterId);

    boolean existsByAuthorId(Long authorId);

    boolean existsByAnimalCenterIdAndAuthorId(Long animalCenterId, Long authorId);

    List<Animal> findAllByAnimalCenterId(Long animalCenterId);

    List<Animal> findAllByAuthorId(Long authorId);

    List<Animal> findAllByAnimalCenterIdAndAuthorId(Long animalCenterId, Long authorId);
}
