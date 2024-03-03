package licenta.service;

import licenta.model.BreedDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BreedDetailsService {

    Page<BreedDetails> getAllBreeds(Pageable pageable);

    BreedDetails getBreedDetailsById(Long id);

    BreedDetails getBreedDetailsByAnimalType(BreedDetails.AnimalType type);

    BreedDetails getBreedDetailsByName(String name);

}
