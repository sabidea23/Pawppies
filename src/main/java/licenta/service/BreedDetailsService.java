package licenta.service;

import licenta.dto.BreedDetailsResponseDTO;
import licenta.entity.BreedDetails;

import java.util.List;

public interface BreedDetailsService {

    List<BreedDetailsResponseDTO> getAllBreeds();

    BreedDetailsResponseDTO getBreedDetailsById(Long id);

    BreedDetailsResponseDTO getBreedDetailsByAnimalType(BreedDetails.AnimalType type);

    BreedDetailsResponseDTO getBreedDetailsByName(String name);
}
