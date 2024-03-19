package licenta.service;

import licenta.dto.AnimalCenterRequestDTO;
import licenta.dto.AnimalCenterResponseDTO;
import licenta.entity.AnimalCenter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface AnimalCenterService {

    AnimalCenter createAnimalCenter(AnimalCenterRequestDTO center) throws Exception;

    AnimalCenter updateAnimalCenter(AnimalCenterRequestDTO center) throws Exception;

    AnimalCenter getAnimalCenter(Long id) throws Exception;

    Page<AnimalCenter> getAnimalCenters(Pageable pageable);

    void deleteAnimalCenter(Long id);

    AnimalCenterResponseDTO getAnimalCenterResponseDTO(AnimalCenter animalCenter);
}
