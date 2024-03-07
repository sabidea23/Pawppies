package licenta.service;

import licenta.model.BreedDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BreedDetailsService {

    List<BreedDetails> getAllBreeds();

    BreedDetails getBreedDetailsById(Long id);

    BreedDetails getBreedDetailsByAnimalType(BreedDetails.AnimalType type);

    BreedDetails getBreedDetailsByName(String name);

}
