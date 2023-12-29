package licenta.service.implementation;

import licenta.exeptions.UniversityAlreadyExists;
import licenta.exeptions.UniversityNotFoundException;
import licenta.model.University;
import licenta.repo.UniversityRepository;
import licenta.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityServiceImpl implements UniversityService {

    @Autowired
    private UniversityRepository universityRepository;

    @Override
    public University createUniversity(University university) throws UniversityAlreadyExists {
        // University with the same `name` already exists
        if (this.universityRepository.existsByName(university.getName())) {
            throw new UniversityAlreadyExists("University with name `" + university.getName() + "` already exists");
        }

        // Create university
        this.universityRepository.save(university);

        return university;
    }

    @Override
    public University updateUniversity(University university) throws UniversityNotFoundException {
        if (!this.universityRepository.existsById(university.getId())) {
            throw new UniversityNotFoundException("University with id `" + university.getId() + "` not found");
        }

        return this.universityRepository.save(university);
    }

    @Override
    public University getUniversity(Long id) throws UniversityNotFoundException {
        if (!this.universityRepository.existsById(id)) {
            throw new UniversityNotFoundException("University with id `" + id + "` not found");
        }

        return this.universityRepository.findById(id).isPresent() ? this.universityRepository.findById(id).get() : null;
    }

    @Override
    public University getUniversity(String name) {
        return this.universityRepository.findByName(name);
    }

    @Override
    public List<University> getUniversities() {
        return this.universityRepository.findAll();
    }

    @Override
    public void deleteUniversity(Long id) {
        this.universityRepository.deleteById(id);
    }
}
