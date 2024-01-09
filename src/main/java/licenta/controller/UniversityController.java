package licenta.controller;

import licenta.exeptions.UniversityNotFoundException;
import licenta.model.University;
import licenta.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.List;

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
            throw new UniversityNotFoundException(
                    "University with id `" + requestBodyUniversity.getId() + "` not found");
        }

        originalUniversity.setName(requestBodyUniversity.getName());
        originalUniversity.setCity(requestBodyUniversity.getCity());
        originalUniversity.setContact(requestBodyUniversity.getContact());
        originalUniversity.setLatitude(requestBodyUniversity.getLatitude());
        originalUniversity.setLongitude(requestBodyUniversity.getLongitude());

        return this.universityService.updateUniversity(originalUniversity);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<University> getAllUniversities() {
        return this.universityService.getUniversities();
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
