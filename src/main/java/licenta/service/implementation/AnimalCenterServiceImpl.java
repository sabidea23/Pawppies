package licenta.service.implementation;

import licenta.exeptions.AnimalCenterAlreadyExists;
import licenta.exeptions.AnimalCenterNotFound;
import licenta.model.AnimalCenter;
import licenta.repo.AnimalCenterRepository;
import licenta.service.AnimalCenterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class AnimalCenterServiceImpl implements AnimalCenterService {

    private final AnimalCenterRepository animalCenterRepository;

    public AnimalCenterServiceImpl(AnimalCenterRepository animalCenterRepository) {
        this.animalCenterRepository = animalCenterRepository;
    }

    @Override
    public AnimalCenter createUniversity(AnimalCenter university) throws AnimalCenterAlreadyExists {
        if (this.animalCenterRepository.existsByName(university.getName())) {
            throw new AnimalCenterAlreadyExists("University with name `" + university.getName() + "` already exists");
        }

        this.animalCenterRepository.save(university);

        return university;
    }

    @Override
    public AnimalCenter updateUniversity(AnimalCenter university) throws AnimalCenterNotFound {
        if (!this.animalCenterRepository.existsById(university.getId())) {
            throw new AnimalCenterNotFound("University with id `" + university.getId() + "` not found");
        }

        return this.animalCenterRepository.save(university);
    }

    @Override
    public AnimalCenter getUniversity(Long id) throws AnimalCenterNotFound {
        if (!this.animalCenterRepository.existsById(id)) {
            throw new AnimalCenterNotFound("University with id `" + id + "` not found");
        }

        return this.animalCenterRepository.findById(id).isPresent() ? this.animalCenterRepository.findById(id).get() : null;
    }

    @Override
    public Page<AnimalCenter> getUniversities(Pageable pageable) {
        return this.animalCenterRepository.findAll(pageable);
    }

    @Override
    public void deleteUniversity(Long id) {
        this.animalCenterRepository.deleteById(id);
    }
}
