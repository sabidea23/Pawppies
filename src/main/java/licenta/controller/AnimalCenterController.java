package licenta.controller;

import licenta.exeptions.AnimalCenterNotFound;
import licenta.model.AnimalCenter;
import licenta.service.AnimalCenterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/university")
@CrossOrigin("*")
public class AnimalCenterController {

    private final AnimalCenterService animalCenterService;

    public AnimalCenterController(AnimalCenterService animalCenterService) {
        this.animalCenterService = animalCenterService;
    }

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalCenter createAnimalCenter(@RequestBody AnimalCenter animalCenter) throws Exception {
        System.out.println(animalCenter.toString());
        return this.animalCenterService.createAnimalCenter(animalCenter);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalCenter updateAnimalCenter(@RequestBody AnimalCenter animalCenter) throws Exception {
        AnimalCenter originalAnimalCenter = this.animalCenterService.getAnimalCenter(animalCenter.getId());
        if (originalAnimalCenter == null) {
            throw new AnimalCenterNotFound("Animal Center with id `" + animalCenter.getId() + "` not found");
        }

        originalAnimalCenter.setName(animalCenter.getName());
        originalAnimalCenter.setCity(animalCenter.getCity());
        originalAnimalCenter.setCountry(animalCenter.getCountry());
        originalAnimalCenter.setContact(animalCenter.getContact());
        originalAnimalCenter.setLatitude(animalCenter.getLatitude());
        originalAnimalCenter.setLongitude(animalCenter.getLongitude());

        return this.animalCenterService.updateAnimalCenter(originalAnimalCenter);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public Page<AnimalCenter> getAnimalCenters(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Pageable paging = PageRequest.of(page, size);
        return this.animalCenterService.getAnimalCenters(paging);
    }

    @GetMapping("/{universityId}")
    @ResponseStatus(code = HttpStatus.OK)
    public AnimalCenter getAnimalCenter(@PathVariable("universityId") Long id) throws Exception {
        return this.animalCenterService.getAnimalCenter(id);
    }

    @DeleteMapping("/{universityId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAnimalCenter(@PathVariable("universityId") Long id) {
        this.animalCenterService.deleteAnimalCenter(id);
    }
}
