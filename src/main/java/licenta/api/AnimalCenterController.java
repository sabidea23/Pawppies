package licenta.api;

import licenta.entity.AnimalCenter;
import licenta.exeptions.AnimalCenterNotFoundException;
import licenta.service.AnimalCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animal-center")
@CrossOrigin("*")
public class AnimalCenterController {

    @Autowired
    private AnimalCenterService animalCenterService;

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalCenter createAnimalCenter(@RequestBody AnimalCenter center) throws Exception {
        return this.animalCenterService.createAnimalCenter(center);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalCenter updateAnimalCenter(@RequestBody AnimalCenter requestBodyAnimalCenter) throws Exception {
        AnimalCenter originalAnimalCenter = this.animalCenterService.getAnimalCenter(requestBodyAnimalCenter.getId());
        if (originalAnimalCenter == null) {
            throw new AnimalCenterNotFoundException(
                    "Animal Center with id `" + requestBodyAnimalCenter.getId() + "` not found");
        }

        originalAnimalCenter.setName(requestBodyAnimalCenter.getName());
        originalAnimalCenter.setDescription(requestBodyAnimalCenter.getDescription());
        originalAnimalCenter.setLocation(requestBodyAnimalCenter.getLocation());

        return this.animalCenterService.updateAnimalCenter(originalAnimalCenter);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<AnimalCenter> getAllAnimalCenters() {
        return this.animalCenterService.getAnimalCenters();
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public AnimalCenter getAnimalCenterById(@PathVariable("id") Long id) throws Exception {
        return this.animalCenterService.getAnimalCenter(id);
    }

    @DeleteMapping("/{animal-centerid}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAnimalCenterById(@PathVariable("animal-centerid") Long animalCenterId) {
        this.animalCenterService.deleteAnimalCenter(animalCenterId);
    }
}
