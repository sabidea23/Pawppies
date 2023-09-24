package licenta.service;

import licenta.entity.AnimalCenter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnimalCenterService {

    AnimalCenter createAnimalCenter(AnimalCenter animalCenter) throws Exception;

    AnimalCenter updateAnimalCenter(AnimalCenter animalCenter) throws Exception;
                                                                                              
    AnimalCenter getAnimalCenter(Long id) throws Exception;

    List<AnimalCenter> getAnimalCenters();

    void deleteAnimalCenter(Long id);
}
