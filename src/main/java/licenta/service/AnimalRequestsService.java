package licenta.service;

import licenta.dto.AdoptionRequestDTO;
import licenta.entity.AdoptionRequest;
import licenta.entity.Animal;
import licenta.entity.User;

import java.util.List;

public interface AnimalRequestsService {
    AdoptionRequest submitAdoptionRequest(AdoptionRequestDTO adoptionRequest);

    User getUserForRequest(Long requestId);

    List<AdoptionRequest> getRequestsForAnimal(Long animalId);

    Animal getAnimalFromRequest(Long requestId);

    AdoptionRequest getAdoptedRequestById(Long requestId);

    List<AdoptionRequest> getAdoptedRequestByUserId(Long userId);

    List<AdoptionRequest> getAdoptionRequestPendingForAnimalId(Long animalId);

    AdoptionRequest updatePendingRequests(Long requestId);

    void deleteRequest(Long requestId);

    void acceptRequest(Long requestId);

    List<AdoptionRequest> getAdoptedRequestPendingForAnimalId(Long animalId);

    void rejectRequest(Long requestId);

    void cancelRequest(Long requestId);

    AdoptionRequest getAdoptionRequestFromUserAndAnimalIds(Long animalId, Long userId);

    List<AdoptionRequest> getRequestsForAnimalCenterId(Long animalCenterId);
}
