package licenta.controller;


import licenta.model.BreedDetails;
import licenta.service.BreedDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/breed-details")
@CrossOrigin("*")
public class BreedDetailsController {

    BreedDetailsService breedDetailsService;

    public BreedDetailsController(BreedDetailsService breedDetailsService) {
        this.breedDetailsService = breedDetailsService;
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<BreedDetails> getAllBreeds() {
        return this.breedDetailsService.getAllBreeds();
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public BreedDetails getBreedDetailsById(@PathVariable("id") Long id) {
        return this.breedDetailsService.getBreedDetailsById(id);
    }

    @GetMapping("/{breedName}")
    @ResponseStatus(code = HttpStatus.OK)
    public BreedDetails getBreedDetailsByName(@PathVariable("breedName") String breedName) {
        return this.breedDetailsService.getBreedDetailsByName(breedName);
    }

    @GetMapping("/{breedType}")
    @ResponseStatus(code = HttpStatus.OK)
    public BreedDetails getBreedDetailsByAnimalType(@PathVariable("breedType") String breedType) {

        BreedDetails.AnimalType type;
        try {
            type = BreedDetails.AnimalType.valueOf(breedType.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid breed name");
        }

        return this.breedDetailsService.getBreedDetailsByAnimalType(type);
    }
}
