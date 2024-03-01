package licenta.repo;

import licenta.model.AnimalCenter;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AnimalCenterRepository extends PagingAndSortingRepository<AnimalCenter, Long> {
    AnimalCenter findByName(String name);

    boolean existsByName(String name);
}
