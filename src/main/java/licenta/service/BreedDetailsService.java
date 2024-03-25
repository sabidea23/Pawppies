package licenta.service;

import licenta.entity.BreedDetails;

import java.util.List;

public interface BreedDetailsService {

    List<BreedDetails> getAllBreeds();

    BreedDetails getBreedDetailsById(Long id);

    List<BreedDetails> getBreedDetailsByAnimalType(BreedDetails.AnimalType type);

    BreedDetails getBreedDetailsByName(String name);

}
