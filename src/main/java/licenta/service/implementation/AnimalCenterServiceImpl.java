package licenta.service.implementation;

import licenta.dto.AnimalCenterRequestDTO;
import licenta.dto.AnimalCenterResponseDTO;
import licenta.exeptions.AnimalCenterAlreadyExists;
import licenta.exeptions.AnimalCenterNotFound;
import licenta.entity.AnimalCenter;
import licenta.entity.User;
import licenta.repo.AnimalCenterRepository;
import licenta.repo.UserRepository;
import licenta.service.AnimalCenterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class AnimalCenterServiceImpl implements AnimalCenterService {

    private final AnimalCenterRepository animalCenterRepository;

    private final UserRepository userRepository;

    public AnimalCenterServiceImpl(AnimalCenterRepository animalCenterRepository, UserRepository userRepository) {
        this.animalCenterRepository = animalCenterRepository;
        this.userRepository = userRepository;
    }

    @Override
    public AnimalCenter createAnimalCenter(AnimalCenterRequestDTO requestDTO) throws AnimalCenterAlreadyExists {

        if (this.animalCenterRepository.existsByName(requestDTO.getName())) {
            throw new AnimalCenterAlreadyExists("Animal Center with name `" + requestDTO.getName() + "` already exists");
        }

        AnimalCenter animalCenter = AnimalCenter.builder()
                .name(requestDTO.getName())
                .longitude(requestDTO.getLongitude())
                .latitude(requestDTO.getLatitude())
                .city(requestDTO.getCity())
                .contact(requestDTO.getContact())
                .country(requestDTO.getCountry())
                .phone(requestDTO.getPhone())
                .mission(requestDTO.getMission())
                .build();

        User admin = userRepository.findById(requestDTO.getAdmin().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        animalCenter.setAdmin(admin);

        return animalCenterRepository.save(animalCenter);
    }

    @Override
    public AnimalCenter updateAnimalCenter(AnimalCenterRequestDTO animalCenter) throws AnimalCenterNotFound {

        AnimalCenter originalAnimalCenter = this.getAnimalCenter(animalCenter.getId());
        if (originalAnimalCenter == null) {
            throw new AnimalCenterNotFound("Animal Center with id `" + animalCenter.getId() + "` not found");
        }

        originalAnimalCenter.setName(animalCenter.getName());
        originalAnimalCenter.setMission(animalCenter.getMission());
        originalAnimalCenter.setCity(animalCenter.getCity());
        originalAnimalCenter.setCountry(animalCenter.getCountry());
        originalAnimalCenter.setContact(animalCenter.getContact());
        originalAnimalCenter.setPhone(animalCenter.getPhone());
        originalAnimalCenter.setLatitude(animalCenter.getLatitude());
        originalAnimalCenter.setLongitude(animalCenter.getLongitude());

        return this.animalCenterRepository.save(originalAnimalCenter);
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

    public AnimalCenterResponseDTO getAnimalCenterResponseDTO(AnimalCenter animalCenter) {
        return AnimalCenterResponseDTO.builder()
                .id(animalCenter.getId())
                .name(animalCenter.getName())
                .longitude(animalCenter.getLongitude())
                .latitude(animalCenter.getLatitude())
                .name(animalCenter.getName())
                .city(animalCenter.getCity())
                .contact(animalCenter.getContact())
                .country(animalCenter.getCountry())
                .mission(animalCenter.getMission())
                .phone(animalCenter.getPhone())
                .admin(animalCenter.getAdmin())
                .build();
    }
}
