package licenta.service.implementation;

import licenta.dto.AdoptionRequestDTO;
import licenta.entity.AdoptionRequest;
import licenta.entity.Animal;
import licenta.entity.User;
import licenta.dto.NotificationRequest;
import licenta.repo.AdoptionRequestRepository;
import licenta.repo.AnimalRepository;
import licenta.repo.UserRepository;
import licenta.service.AnimalRequestsService;
import licenta.service.NotificationService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnimalRequestsServiceImpl implements AnimalRequestsService {
    private final AdoptionRequestRepository adoptionRequestRepository;
    private final AnimalRepository animalRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public AnimalRequestsServiceImpl(AdoptionRequestRepository adoptionRequestRepository, AnimalRepository animalRepository, UserRepository userRepository, NotificationService notificationService) {
        this.adoptionRequestRepository = adoptionRequestRepository;
        this.animalRepository = animalRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public AdoptionRequest submitAdoptionRequest(AdoptionRequestDTO adoptionRequest) {
        Optional<User> user = this.userRepository.findById(adoptionRequest.getUserId());
        Optional<Animal> animal = this.animalRepository.findById(adoptionRequest.getAnimalRequestedId());

        AdoptionRequest adoptionRequest1 = AdoptionRequest.builder().adoptionRequestAnimal(animal.get()).requestedDate(LocalDateTime.now()).adoptionRequestUser(user.get()).firstName(adoptionRequest.getFirstName()).lastName(adoptionRequest.getLastName()).email(adoptionRequest.getEmail()).phone(adoptionRequest.getPhone()).reason(adoptionRequest.getReason()).status("SUBMITTED").build();

        return this.adoptionRequestRepository.save(adoptionRequest1);
    }

    public List<AdoptionRequest> getRequestsForAnimal(Long animalId) {
        return this.adoptionRequestRepository.findAllByAdoptionRequestAnimalId(animalId);
    }

    public AdoptionRequest getAdoptedRequestById(Long requestId) {
        return this.adoptionRequestRepository.findById(requestId).get();
    }

    public Animal getAnimalFromRequest(Long requestId) {
        Optional<AdoptionRequest> adoptionRequest = this.adoptionRequestRepository.findById(requestId);
        return adoptionRequest.get().getAdoptionRequestAnimal();
    }

    public List<AdoptionRequest> getAdoptedRequestByUserId(Long userId) {
        return this.adoptionRequestRepository.findAllByAdoptionRequestUserId(userId);
    }

    public AdoptionRequest getAdoptionRequestFromUserAndAnimalIds(Long animalId, Long userId) {
        List<AdoptionRequest> adoptionRequestsFromUser = getAdoptedRequestByUserId(userId);
        if (adoptionRequestsFromUser.size() == 0) {
            return null;
        }
        List<AdoptionRequest> adoptionRequest = adoptionRequestsFromUser.stream()
                .filter(adoptionRequest1 -> adoptionRequest1.getAdoptionRequestAnimal().getId() == animalId)
                .collect(Collectors.toList());
        return adoptionRequest.get(0);
    }

    public List<AdoptionRequest> getAdoptionRequestPendingForAnimalId(Long animalId) {
        List<AdoptionRequest> adoptionRequests = this.adoptionRequestRepository.findAllByAdoptionRequestAnimalId(animalId);
        return adoptionRequests.stream().filter(adoptionRequest -> Objects.equals(adoptionRequest.getStatus(), "SUBMITTED") || Objects.equals(adoptionRequest.getStatus(), "PENDING")).collect(Collectors.toList());
    }

    public List<AdoptionRequest> getAdoptedRequestPendingForAnimalId(Long animalId) {
        List<AdoptionRequest> adoptionRequests = this.adoptionRequestRepository.findAllByAdoptionRequestAnimalId(animalId);
        return adoptionRequests.stream().filter(adoptionRequest -> Objects.equals(adoptionRequest.getStatus(), "PENDING")).collect(Collectors.toList());
    }

    public AdoptionRequest updatePendingRequests(Long requestId) {

        Optional<AdoptionRequest> adoptionRequest = this.adoptionRequestRepository.findById(requestId);

        //notiificare user ca a primit animalul
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setAuthor(adoptionRequest.get().getAdoptionRequestAnimal().getAnimalCenter().getName());
        notificationRequest.setUserId(adoptionRequest.get().getAdoptionRequestUser().getId());
        notificationRequest.setMessage("Congratulations! Your adoption request for" + adoptionRequest.get().getAdoptionRequestAnimal().getName() + " has been accepted." + " Please visit our animal center within the next 5 days to meet your potential new family member. We're excited to see you!");
        this.notificationService.createNotification(notificationRequest);

        adoptionRequest.get().setStatus("PENDING");
        adoptionRequest.get().setPendingDate(LocalDateTime.now());
        return this.adoptionRequestRepository.save(adoptionRequest.get());
    }

    public void deleteRequest(Long requestId) {
        this.adoptionRequestRepository.deleteById(requestId);
    }

    public void acceptRequest(Long requestId) {

        //sterge cerere
        Optional<AdoptionRequest> adoptionRequest = this.adoptionRequestRepository.findById(requestId);
        User user = adoptionRequest.get().getAdoptionRequestUser();
        Animal animal = adoptionRequest.get().getAdoptionRequestAnimal();
        this.adoptionRequestRepository.deleteById(requestId);

        //setare animal adoptat
        animal.setIsAdopted(true);
        this.animalRepository.save(animal);

        //adaugare animal in lista de animale adoptate
        user.getAdoptedAnimals().add(animal);
        this.userRepository.save(user);

        //stergere restul cererilor care au animalul
        List<AdoptionRequest> requests = this.adoptionRequestRepository.findAllByAdoptionRequestAnimalId(animal.getId());
        List<Long> userIds = requests.stream().map(request -> request.getAdoptionRequestUser().getId()).collect(Collectors.toList());

        for (AdoptionRequest request : requests) {
            this.adoptionRequestRepository.deleteById(request.getId());
        }

        //notiificare user ca a primit animalul
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setAuthor(animal.getAnimalCenter().getName());
        notificationRequest.setUserId(user.getId());
        notificationRequest.setMessage("Congratulations on your successful animal adoption! " + "Thank you for providing a loving home. Best wishes from." + animal.getAnimalCenter().getName());
        this.notificationService.createNotification(notificationRequest);

        //notificare restul oamenilor ca animalul a fost dat
        for (Long id : userIds) {
            NotificationRequest notificationRequestReject = new NotificationRequest();
            notificationRequestReject.setAuthor(animal.getAnimalCenter().getName());
            notificationRequestReject.setUserId(id);
            notificationRequestReject.setMessage("We appreciate your interest in adopting" + animal.getName() + " from " + animal.getAnimalCenter().getName() + ". We wanted to inform you that the animal you applied for has been adopted" + " by another family. We encourage you to keep looking at our center as there are many animals still" + " waiting for a loving home. Thank you for your understanding and your willingness to adopt.");
            this.notificationService.createNotification(notificationRequestReject);
        }
    }

    public void rejectRequest(Long requestId) {
        //sterge cerere
        Optional<AdoptionRequest> adoptionRequest = this.adoptionRequestRepository.findById(requestId);
        User user = adoptionRequest.get().getAdoptionRequestUser();
        Animal animal = adoptionRequest.get().getAdoptionRequestAnimal();
        this.adoptionRequestRepository.deleteById(requestId);

        //notiificare user ca a fost respinsa cererea 
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setAuthor(animal.getAnimalCenter().getName());
        notificationRequest.setUserId(user.getId());
        notificationRequest.setMessage("We regret to inform you that your adoption request for" + animal.getName() + " has been " + "declined by the administrator our center. We appreciate your willingness to adopt and encourage you to consider other animals in need of a home. Thank you for your understanding.");
        this.notificationService.createNotification(notificationRequest);
    }

    public void cancelRequest(Long requestId) {
        //sterge cerere
        Optional<AdoptionRequest> adoptionRequest = this.adoptionRequestRepository.findById(requestId);
        User user = adoptionRequest.get().getAdoptionRequestUser();
        Animal animal = adoptionRequest.get().getAdoptionRequestAnimal();
        this.adoptionRequestRepository.deleteById(requestId);

        //notiificare user ca a fost respinsa cererea
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setAuthor(animal.getAnimalCenter().getName());
        notificationRequest.setUserId(user.getId());
        notificationRequest.setMessage("Your adoption request for" + animal.getName() + " has been successfully canceled. " + "If you change your mind or wish to adopt in the future, please feel free to reach out to us again at" + animal.getAnimalCenter().getName() + ". Thank you for considering adoption.");
        this.notificationService.createNotification(notificationRequest);
    }


    @Scheduled(cron = "0 0 * * * ?")
    public void performHourlyTask() {

        // scoate requests in starea pending din repository- lista
        List<AdoptionRequest> adoptionRequests = this.adoptionRequestRepository.findAll();
        List<AdoptionRequest> pendingRequest = adoptionRequests.stream().filter(adoptionRequest -> adoptionRequest.getPendingDate().isAfter(LocalDateTime.now().minusDays(5))).collect(Collectors.toList());

        // daca da =>
        Map<User, Animal> userAnimalMap = pendingRequest.stream().collect(Collectors.toMap(AdoptionRequest::getAdoptionRequestUser, AdoptionRequest::getAdoptionRequestAnimal, (existing, replacement) -> existing));

        //se sterg requests
        for (AdoptionRequest adoptionRequest : pendingRequest) {
            this.adoptionRequestRepository.deleteById(adoptionRequest.getId());
        }

        //notificare restul oamenilor ca animalul a fost dat
        for (Map.Entry<User, Animal> entry : userAnimalMap.entrySet()) {
            User user = entry.getKey();
            Animal animal = entry.getValue();
            NotificationRequest notificationRequestReject = new NotificationRequest();
            notificationRequestReject.setAuthor(animal.getAnimalCenter().getName());
            notificationRequestReject.setUserId(user.getId());
            notificationRequestReject.setMessage("Your adoption request for" + animal.getName() + " has been canceled due to no " + "visit within the 5-day period. Please visit" + animal.getAnimalCenter().getName() + " future adoptions. Thank you.");
            this.notificationService.createNotification(notificationRequestReject);
        }
    }
}
