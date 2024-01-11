package licenta.controller;

import licenta.exeptions.UniversityNotFoundException;
import licenta.model.University;
import licenta.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/university")
@CrossOrigin("*")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public University createUniversity(@RequestBody University university) throws Exception {
        System.out.println(university.toString());
        return this.universityService.createUniversity(university);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public University updateUniversity(@RequestBody University requestBodyUniversity) throws Exception {
        University originalUniversity = this.universityService.getUniversity(requestBodyUniversity.getId());
        if (originalUniversity == null) {
            throw new UniversityNotFoundException("University with id `" + requestBodyUniversity.getId() + "` not found");
        }

        originalUniversity.setName(requestBodyUniversity.getName());
        originalUniversity.setCity(requestBodyUniversity.getCity());
        originalUniversity.setCountry(requestBodyUniversity.getCountry());
        originalUniversity.setContact(requestBodyUniversity.getContact());
        originalUniversity.setLatitude(requestBodyUniversity.getLatitude());
        originalUniversity.setLongitude(requestBodyUniversity.getLongitude());

        return this.universityService.updateUniversity(originalUniversity);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public Page<University> getAllUniversities(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Pageable paging = PageRequest.of(page, size);
        return this.universityService.getUniversities(paging);
    }

    @GetMapping("/{universityId}")
    @ResponseStatus(code = HttpStatus.OK)
    public University getUniversityById(@PathVariable("universityId") Long universityId) throws Exception {
        return this.universityService.getUniversity(universityId);
    }

    @DeleteMapping("/{universityId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUniversityById(@PathVariable("universityId") Long universityId) {
        this.universityService.deleteUniversity(universityId);
    }
}
