package licenta.repo;

import licenta.entity.AnimalCenter;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface AnimalCenterRepository extends PagingAndSortingRepository<AnimalCenter, Long> {

    boolean existsByName(String name);

    @Query("SELECT ac.name FROM AnimalCenter ac")
    List<String> findAllCenterNames();
}
