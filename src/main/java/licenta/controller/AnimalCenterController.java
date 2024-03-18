package licenta.controller;

import licenta.dto.AnimalCenterRequestDTO;
import licenta.exeptions.ForbiddenActionForRole;
import licenta.model.AnimalCenter;
import licenta.service.AnimalCenterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/center")
@CrossOrigin("*")
public class AnimalCenterController {

    private final AnimalCenterService animalCenterService;

    public AnimalCenterController(AnimalCenterService animalCenterService) {
        this.animalCenterService = animalCenterService;
    }

//    Injectează Authentication în metoda ta din controller:
//    Spring Security îți permite să injectezi un obiect Authentication care conține detaliile despre utilizatorul curent autentificat.
    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalCenter createAnimalCenter(@RequestBody AnimalCenterRequestDTO animalCenterRequest, Authentication authentication) throws Exception {
        // Verifică rolul utilizatorului
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {

            return this.animalCenterService.createAnimalCenter(animalCenterRequest);
        }
        else throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
    }
    
    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public Page<AnimalCenter> getAnimalCenters(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Pageable paging = PageRequest.of(page, size);
        return this.animalCenterService.getAnimalCenters(paging);
    }

    @GetMapping("/{centerId}")
    @ResponseStatus(code = HttpStatus.OK)
    public AnimalCenter getAnimalCenter(@PathVariable("centerId") Long id) throws Exception {
        return this.animalCenterService.getAnimalCenter(id);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalCenter updateAnimalCenter(@RequestBody AnimalCenterRequestDTO animalCenter, Authentication authentication) throws Exception {
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            return this.animalCenterService.updateAnimalCenter(animalCenter);
        } else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }

    @DeleteMapping("/{centerId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAnimalCenter(@PathVariable("centerId") Long id, Authentication authentication) {
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            this.animalCenterService.deleteAnimalCenter(id);
        } else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }
}
