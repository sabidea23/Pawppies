package licenta.repo;

import licenta.model.University;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UniversityRepository extends PagingAndSortingRepository<University, Long> {
    University findByName(String name);

    boolean existsByName(String name);
}
