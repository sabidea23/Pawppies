package licenta.repo;

import licenta.model.AnimalCenter;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AnimalCenterRepository extends PagingAndSortingRepository<AnimalCenter, Long> {

    boolean existsByName(String name);
}
