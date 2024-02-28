package licenta.service;

import licenta.model.University;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


public interface UniversityService {

    University createUniversity(University university) throws Exception;

    University updateUniversity(University university) throws Exception;

    University getUniversity(Long id) throws Exception;

    Page<University> getUniversities(Pageable pageable);

    void deleteUniversity(Long id);
}
