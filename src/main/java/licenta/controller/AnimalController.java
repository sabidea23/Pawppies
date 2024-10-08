package licenta.controller;

import licenta.dto.AnimalRequestDTO;
import licenta.dto.AnimalResponseDTO;
import licenta.exeptions.ForbiddenActionForRole;
import licenta.entity.Animal;
import licenta.entity.ImageModel;
import licenta.service.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/animal")
@CrossOrigin("*")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @PostMapping(value = {"/"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalResponseDTO createAnimal(@RequestPart("animal")  AnimalRequestDTO animal,
                               @RequestPart("imageFile") MultipartFile[] file,
                               Authentication authentication) {
        if (authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("SUPPLIER"))) {
            try {
                Set<ImageModel> imageModels = animalService.uploadImage(file);
                return this.animalService.createAnimal(animal, imageModels);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Animal could not be created", e);
            }
        } else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }

    @GetMapping("/{animalId}")
    @ResponseStatus(code = HttpStatus.OK)
    public AnimalResponseDTO getAnimal(@PathVariable("animalId") Long id) throws Exception {
        return this.animalService.getAnimal(id);
    }

    @GetMapping("/center/{centerId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<AnimalResponseDTO> getAnimalsByCenterId(@PathVariable("centerId") Long id) throws Exception {
        return this.animalService.getAnimalsByCenterId(id);
    }


    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<AnimalResponseDTO> getAnimals() {
        return this.animalService.getAnimals();
    }

    @PutMapping("/{animalId}/like/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalResponseDTO likeAnimal(@PathVariable("animalId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.likeRAnimal(animalId, userId);
    }

    @GetMapping("/{animalId}/like-status/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public boolean getLikeStatus(@PathVariable("animalId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.getLikeStatus(animalId, userId);
    }

    @GetMapping("/liked-animals/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<AnimalResponseDTO> getLikedAnimals(@PathVariable("userId") Long userId) throws Exception {
        return this.animalService.getLikedAnimals(userId);
    }

    @PutMapping(value = "/{animalId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.OK)
    public Animal updateAnimal(@PathVariable("animalId") Long animalId,
                               @RequestPart("animal") Animal animalDetails,
                               @RequestPart(value = "imageFile", required = false) MultipartFile[] files,
                               Authentication authentication) throws Exception {
        if (authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("SUPPLIER"))) {
            Animal originalAnimal = this.animalService.findAnimal(animalId);
            return this.animalService.updateAnimal(originalAnimal, animalDetails, files);

        } else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }

    @DeleteMapping("/{animalId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAnimal(@PathVariable("animalId") Long id, Authentication authentication) {
        if (authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("SUPPLIER"))) {
            this.animalService.deleteAnimal(id);
        }
        else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }
}
