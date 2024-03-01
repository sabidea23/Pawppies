package licenta.service;

import licenta.model.AnimalCenter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface AnimalCenterService {

    AnimalCenter createUniversity(AnimalCenter university) throws Exception;

    AnimalCenter updateUniversity(AnimalCenter university) throws Exception;

    AnimalCenter getUniversity(Long id) throws Exception;

    Page<AnimalCenter> getUniversities(Pageable pageable);

    void deleteUniversity(Long id);
}
