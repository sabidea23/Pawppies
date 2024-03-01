package licenta.service;

import licenta.model.AnimalCenter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface AnimalCenterService {

    AnimalCenter createAnimalCenter(AnimalCenter center) throws Exception;

    AnimalCenter updateAnimalCenter(AnimalCenter center) throws Exception;

    AnimalCenter getAnimalCenter(Long id) throws Exception;

    Page<AnimalCenter> getAnimalCenters(Pageable pageable);

    void deleteAnimalCenter(Long id);
}
