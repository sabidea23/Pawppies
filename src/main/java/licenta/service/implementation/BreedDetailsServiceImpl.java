package licenta.service.implementation;

import licenta.entity.BreedDetails;
import licenta.repo.BreedDetailsRepository;
import licenta.service.BreedDetailsService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreedDetailsServiceImpl implements BreedDetailsService {

    BreedDetailsRepository breedDetailsRepository;

    public BreedDetailsServiceImpl(BreedDetailsRepository breedDetailsRepository) {
        this.breedDetailsRepository = breedDetailsRepository;
    }

    @Override
    public List<BreedDetails> getAllBreeds() {
        return breedDetailsRepository.findAll();
    }

    @Override
    public BreedDetails getBreedDetailsById(Long id) {
        return breedDetailsRepository.findBreedDetailsById(id);
    }

    @Override
    public List<BreedDetails> getBreedDetailsByAnimalType(BreedDetails.AnimalType type) {
        return breedDetailsRepository.findBreedDetailsByAnimalType(type);
    }

    @Override
    public BreedDetails getBreedDetailsByName(String name) {
        return breedDetailsRepository.findBreedDetailsByName(name);
    }
}
