package licenta.repo;

import licenta.entity.BreedDetails;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BreedDetailsRepository extends JpaRepository<BreedDetails, Long> {

    BreedDetails findBreedDetailsByAnimalType(BreedDetails.AnimalType animalType);

    BreedDetails findBreedDetailsById(Long id);

    BreedDetails findBreedDetailsByName(String name);

}
