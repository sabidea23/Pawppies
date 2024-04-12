package licenta.controller;

import licenta.dto.AdoptionRequestDTO;
import licenta.entity.AdoptionRequest;
import licenta.entity.Animal;
import licenta.service.AnimalRequestsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adopt-request")
@CrossOrigin("*")
public class AdoptionRequestController {

    private final AnimalRequestsService animalRequestsService;

    public AdoptionRequestController(AnimalRequestsService animalRequestsService) {
        this.animalRequestsService = animalRequestsService;
    }

    @PostMapping("/submit")
    public ResponseEntity<AdoptionRequest> submitAdoptionRequest(@RequestBody AdoptionRequestDTO adoptionRequestDTO) {
        return ResponseEntity.ok(animalRequestsService.submitAdoptionRequest(adoptionRequestDTO));
    }

    @GetMapping("/animal-from-request/{requestId}")
    public ResponseEntity<Animal> getAnimalFromRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(animalRequestsService.getAnimalFromRequest(requestId));
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AdoptionRequest>> getRequestsForAnimal(@PathVariable Long animalId) {
        return ResponseEntity.ok(animalRequestsService.getRequestsForAnimal(animalId));
    }

    @GetMapping("/animal/{animalId}/user/{userId}")
    public ResponseEntity<AdoptionRequest> getAdoptionRequestFromUserAndAnimalIds(@PathVariable Long animalId,
                                                                                  @PathVariable Long userId) {
        return ResponseEntity.ok(animalRequestsService.getAdoptionRequestFromUserAndAnimalIds(animalId, userId));
    }

    @GetMapping("/request/{requestId}")
    public ResponseEntity<AdoptionRequest> getAdoptedRequestById(@PathVariable Long requestId) {
        return ResponseEntity.ok(animalRequestsService.getAdoptedRequestById(requestId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdoptionRequest>> getAdoptedRequestByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(animalRequestsService.getAdoptedRequestByUserId(userId));
    }

    @GetMapping("/pending/animal/{animalId}")
    public ResponseEntity<List<AdoptionRequest>> getAdoptionRequestPendingForAnimalId(@PathVariable Long animalId) {
        return ResponseEntity.ok(animalRequestsService.getAdoptionRequestPendingForAnimalId(animalId));
    }

    @GetMapping("/pending-adopted/animal/{animalId}")
    public ResponseEntity<List<AdoptionRequest>> getAdoptedRequestPendingForAnimalId(@PathVariable Long animalId) {
        return ResponseEntity.ok(animalRequestsService.getAdoptedRequestPendingForAnimalId(animalId));
    }

    @PutMapping("/update-pending/{requestId}")
    public ResponseEntity<AdoptionRequest> updatePendingRequests(@PathVariable Long requestId) {
        return ResponseEntity.ok(animalRequestsService.updatePendingRequests(requestId));
    }

    @DeleteMapping("/delete/{requestId}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long requestId) {
        animalRequestsService.deleteRequest(requestId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/accept/{requestId}")
    public ResponseEntity<Void> acceptRequest(@PathVariable Long requestId) {
        animalRequestsService.acceptRequest(requestId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/reject/{requestId}")
    public ResponseEntity<Void> rejectRequest(@PathVariable Long requestId) {
        animalRequestsService.rejectRequest(requestId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/cancel/{requestId}")
    public ResponseEntity<Void> cancelRequest(@PathVariable Long requestId) {
        animalRequestsService.cancelRequest(requestId);
        return ResponseEntity.ok().build();
    }
}
