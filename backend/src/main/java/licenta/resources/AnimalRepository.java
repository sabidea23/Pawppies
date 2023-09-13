package licenta.resources;


import licenta.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    boolean existsAnimalById(Long id);

    boolean existsByAuthorId(Long authorId);

    boolean existsByIdAndAuthor(Long id, Long authorId);

    List<Animal> findAllById(Long id);

    List<Animal> findAllByAuthor(Long authorId);

    List<Animal> findAllByIdAndAuthor(Long id, Long authorId);
}
