package licenta.service.implementation;

import licenta.entity.AnimalCenter;
import licenta.exeptions.AnimalCenterAlreadyExists;
import licenta.exeptions.AnimalCenterNotFoundException;
import licenta.resources.AnimalCenterRepository;
import licenta.service.AnimalCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalCenterServiceImpl implements AnimalCenterService {

    @Autowired
    private AnimalCenterRepository animalCenterRepository;

    @Override
    public AnimalCenter createAnimalCenter(AnimalCenter animalCenter) throws AnimalCenterAlreadyExists {
        if (this.animalCenterRepository.existsByName(animalCenter.getName())) {
            throw new AnimalCenterAlreadyExists("Animal Center with name `" + animalCenter.getName() + "` already exists");
        }

        // Create animalCenter
        this.animalCenterRepository.save(animalCenter);

        return animalCenter;
    }

    @Override
    public AnimalCenter updateAnimalCenter(AnimalCenter animalCenter) throws AnimalCenterNotFoundException {
        if (!this.animalCenterRepository.existsById(animalCenter.getId())) {
            throw new AnimalCenterNotFoundException("Aniaml Center with id `" + animalCenter.getId() + "` not found");
        }

        return this.animalCenterRepository.save(animalCenter);
    }

    @Override
    public AnimalCenter getAnimalCenter(Long id) throws AnimalCenterNotFoundException {
        if (!this.animalCenterRepository.existsById(id)) {
            throw new AnimalCenterNotFoundException("Animal Center with id `" + id + "` not found");
        }

        return this.animalCenterRepository.findById(id).isPresent() ? this.animalCenterRepository.findById(id).get() : null;
    }
    
    @Override
    public List<AnimalCenter> getAnimalCenters() {
        return this.animalCenterRepository.findAll();
    }

    @Override
    public void deleteAnimalCenter(Long id) {
        this.animalCenterRepository.deleteById(id);
    }
}
