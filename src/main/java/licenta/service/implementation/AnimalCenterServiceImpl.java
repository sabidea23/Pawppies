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
    public AnimalCenter createAnimalCenter(AnimalCenter center) throws AnimalCenterAlreadyExists {
        if (this.animalCenterRepository.existsByName(center.getName())) {
            throw new AnimalCenterAlreadyExists("Animal Center with name `" + center.getName() + "` already exists");
        }

        this.animalCenterRepository.save(center);

        return center;
    }

    @Override
    public AnimalCenter updateAnimalCenter(AnimalCenter animalCenter) throws AnimalCenterNotFound {

        AnimalCenter originalAnimalCenter = this.getAnimalCenter(animalCenter.getId());
        if (originalAnimalCenter == null) {
            throw new AnimalCenterNotFound("Animal Center with id `" + animalCenter.getId() + "` not found");
        }

        originalAnimalCenter.setName(animalCenter.getName());
        originalAnimalCenter.setCity(animalCenter.getCity());
        originalAnimalCenter.setCountry(animalCenter.getCountry());
        originalAnimalCenter.setContact(animalCenter.getContact());
        originalAnimalCenter.setLatitude(animalCenter.getLatitude());
        originalAnimalCenter.setLongitude(animalCenter.getLongitude());

        return this.animalCenterRepository.save(animalCenter);
    }

    @Override
    public AnimalCenter getAnimalCenter(Long id) throws AnimalCenterNotFound {
        if (!this.animalCenterRepository.existsById(id)) {
            throw new AnimalCenterNotFound("Animal Center with id `" + id + "` not found");
        }

        return this.animalCenterRepository.findById(id).isPresent() ? this.animalCenterRepository.findById(id).get() : null;
    }

    @Override
    public Page<AnimalCenter> getAnimalCenters(Pageable pageable) {
        return this.animalCenterRepository.findAll(pageable);
    }

    @Override
    public void deleteAnimalCenter(Long id) {
        this.animalCenterRepository.deleteById(id);
    }
}
