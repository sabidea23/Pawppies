package licenta.repo;

import licenta.model.BreedDetails;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface BreedDetailsRepository extends PagingAndSortingRepository<BreedDetails, Long> {

    BreedDetails findBreedDetailsByAnimalType(BreedDetails.AnimalType animalType);

    BreedDetails findBreedDetailsById(Long id);

    BreedDetails findBreedDetailsByName(String name);

}
