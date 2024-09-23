package licenta.controller;

import licenta.dto.AdoptionRequestDTO;
import licenta.entity.AdoptionRequest;
import licenta.entity.Animal;
import licenta.entity.User;
import licenta.exeptions.ForbiddenActionForRole;
import licenta.service.AnimalRequestsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    @GetMapping("/user-from-request/{userId}")
    public ResponseEntity<User> getUserForRequest(@PathVariable Long userId) {
        return ResponseEntity.ok(animalRequestsService.getUserForRequest(userId));
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
    public ResponseEntity<AdoptionRequest> getAdoptionRequestFromUserAndAnimalIds(@PathVariable Long animalId, @PathVariable Long userId) {
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

    @GetMapping("/center/{animalCenterId}")
    public ResponseEntity<List<AdoptionRequest>> getRequestsForAnimalCenterId(@PathVariable Long animalCenterId) {
        return ResponseEntity.ok(animalRequestsService.getRequestsForAnimalCenterId(animalCenterId));
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
    public ResponseEntity<AdoptionRequest> updatePendingRequests(@PathVariable Long requestId, Authentication authentication) {

        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("SUPPLIER"))) {
            return ResponseEntity.ok(animalRequestsService.updatePendingRequests(requestId));
        } else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }

    @DeleteMapping("/delete/{requestId}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long requestId) {
        animalRequestsService.deleteRequest(requestId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/accept/{requestId}")
    public ResponseEntity<Void> acceptRequest(@PathVariable Long requestId, Authentication authentication) {
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("SUPPLIER"))) {
            animalRequestsService.acceptRequest(requestId);
            return ResponseEntity.ok().build();
        } else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }

    @PutMapping("/reject/{requestId}")
    public ResponseEntity<Void> rejectRequest(@PathVariable Long requestId, Authentication authentication) {

        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("SUPPLIER"))) {

            animalRequestsService.rejectRequest(requestId);
            return ResponseEntity.ok().build();
        } else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }

    @DeleteMapping("/cancel/{requestId}")
    public void cancelRequest(@PathVariable Long requestId) {
        animalRequestsService.cancelRequest(requestId);
    }
}
