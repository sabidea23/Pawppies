package licenta.service;

import licenta.dto.AdoptionRequestDTO;
import licenta.entity.AdoptionRequest;

import java.util.List;

public interface AnimalRequestsService {
    AdoptionRequest submitAdoptionRequest(AdoptionRequestDTO adoptionRequest);

    List<AdoptionRequest> getRequestsForAnimal(Long animalId);

    AdoptionRequest getAdoptedRequestById(Long requestId);

    List<AdoptionRequest> getAdoptedRequestByUserId(Long userId);

    List<AdoptionRequest> getAdoptionRequestPendingForAnimalId(Long animalId);

    AdoptionRequest updatePendingRequests(Long requestId);

    void deleteRequest(Long requestId);

    void acceptRequest(Long requestId);

    List<AdoptionRequest> getAdoptedRequestPendingForAnimalId(Long animalId);

    void rejectRequest(Long requestId);

    void cancelRequest(Long requestId);
}
