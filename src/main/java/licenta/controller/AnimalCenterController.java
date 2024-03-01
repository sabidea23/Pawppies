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
    public AnimalCenter createUniversity(@RequestBody AnimalCenter university) throws Exception {
        System.out.println(university.toString());
        return this.animalCenterService.createUniversity(university);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AnimalCenter updateUniversity(@RequestBody AnimalCenter requestBodyUniversity) throws Exception {
        AnimalCenter originalUniversity = this.animalCenterService.getUniversity(requestBodyUniversity.getId());
        if (originalUniversity == null) {
            throw new AnimalCenterNotFound("University with id `" + requestBodyUniversity.getId() + "` not found");
        }

        originalUniversity.setName(requestBodyUniversity.getName());
        originalUniversity.setCity(requestBodyUniversity.getCity());
        originalUniversity.setCountry(requestBodyUniversity.getCountry());
        originalUniversity.setContact(requestBodyUniversity.getContact());
        originalUniversity.setLatitude(requestBodyUniversity.getLatitude());
        originalUniversity.setLongitude(requestBodyUniversity.getLongitude());

        return this.animalCenterService.updateUniversity(originalUniversity);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public Page<AnimalCenter> getAllUniversities(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Pageable paging = PageRequest.of(page, size);
        return this.animalCenterService.getUniversities(paging);
    }

    @GetMapping("/{universityId}")
    @ResponseStatus(code = HttpStatus.OK)
    public AnimalCenter getUniversityById(@PathVariable("universityId") Long universityId) throws Exception {
        return this.animalCenterService.getUniversity(universityId);
    }

    @DeleteMapping("/{universityId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUniversityById(@PathVariable("universityId") Long universityId) {
        this.animalCenterService.deleteUniversity(universityId);
    }
}
