package licenta.controller;

import licenta.dto.BreedDetailsResponseDTO;
import licenta.entity.BreedDetails;
import licenta.service.BreedDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/breed-details")
@CrossOrigin("*")
public class BreedDetailsController {

    private final BreedDetailsService breedDetailsService;

    public BreedDetailsController(BreedDetailsService breedDetailsService) {
        this.breedDetailsService = breedDetailsService;
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<BreedDetailsResponseDTO> getAllBreeds() {
        return this.breedDetailsService.getAllBreeds();
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public BreedDetailsResponseDTO getBreedDetailsById(@PathVariable("id") Long id) {
        return this.breedDetailsService.getBreedDetailsById(id);
    }

    @GetMapping("/{breedName}")
    @ResponseStatus(code = HttpStatus.OK)
    public BreedDetailsResponseDTO getBreedDetailsByName(@PathVariable("breedName") String breedName) {
        return this.breedDetailsService.getBreedDetailsByName(breedName);
    }

    @GetMapping("/{breedType}")
    @ResponseStatus(code = HttpStatus.OK)
    public BreedDetailsResponseDTO getBreedDetailsByAnimalType(@PathVariable("breedType") String breedType) {

        BreedDetails.AnimalType type;
        try {
            type = BreedDetails.AnimalType.valueOf(breedType.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid breed name");
        }

        return this.breedDetailsService.getBreedDetailsByAnimalType(type);
    }
}
