package licenta.repo;

import licenta.entity.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {

    List<AdoptionRequest> findAllByAdoptionRequestAnimalId(Long annimalId);

    List<AdoptionRequest> findAllByAdoptionRequestUserId(Long userId);

    void deleteById(Long userId);
}
