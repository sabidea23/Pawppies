package licenta.service.implementation;

import licenta.dto.BreedDetailsResponseDTO;
import licenta.entity.BreedDetails;
import licenta.repo.BreedDetailsRepository;
import licenta.service.BreedDetailsService;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BreedDetailsServiceImpl implements BreedDetailsService {

    BreedDetailsRepository breedDetailsRepository;

    public BreedDetailsServiceImpl(BreedDetailsRepository breedDetailsRepository) {
        this.breedDetailsRepository = breedDetailsRepository;
    }

    @Override
    public List<BreedDetailsResponseDTO> getAllBreeds() {
        List<BreedDetails> animalList =  breedDetailsRepository.findAll();
        return animalList.stream()
                .map(this::getBreedDetailsDTO)
                .collect(Collectors.toList());
    }

    private BreedDetailsResponseDTO getBreedDetailsDTO(BreedDetails animal) {
        return BreedDetailsResponseDTO.builder()
                .activityLevel(animal.getActivityLevel())
                .animalType(animal.getAnimalType())
                .description(animal.getDescription())
                .easeOfTraining(animal.getEaseOfTraining())
                .exerciseRequirements(animal.getExerciseRequirements())
                .health(animal.getHealth())
                .history(animal.getHistory())
                .image(animal.getImage())
                .friendlinessToChildren(animal.getFriendlinessToChildren())
                .friendlinessToOtherPets(animal.getFriendlinessToOtherPets())
                .groomingRequirements(animal.getGroomingRequirements())
                .maxHeight(animal.getMaxHeight())
                .heatSensitivity(animal.getHeatSensitivity())
                .minHeight(animal.getMinHeight())
                .maxWeight(animal.getMaxWeight())
                .minWeight(animal.getMinWeight())
                .independence(animal.getIndependence())
                .intelligence(animal.getIntelligence())
                .personality(animal.getPersonality())
                .playfulness(animal.getPlayfulness())
                .vocality(animal.getVocality())
                .watchfulness(animal.getWatchfulness())
                .affectionForOwners(animal.getAffectionForOwners())
                .needForAttention(animal.getNeedForAttention())
                .name(animal.getName())
                .build();

    }

    @Override
    public BreedDetailsResponseDTO getBreedDetailsById(Long id) {
        return getBreedDetailsDTO(breedDetailsRepository.findBreedDetailsById(id));
    }

    @Override
    public BreedDetailsResponseDTO getBreedDetailsByAnimalType(BreedDetails.AnimalType type) {
        return getBreedDetailsDTO(breedDetailsRepository.findBreedDetailsByAnimalType(type));
    }

    @Override
    public BreedDetailsResponseDTO getBreedDetailsByName(String name) {
        return getBreedDetailsDTO(breedDetailsRepository.findBreedDetailsByName(name));
    }
}
