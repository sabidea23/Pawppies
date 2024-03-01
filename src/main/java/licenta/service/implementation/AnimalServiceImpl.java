package licenta.service.implementation;

import licenta.exeptions.AnimalNotFoundExeption;
import licenta.model.Animal;
import licenta.repo.AnimalRepository;
import licenta.service.AnimalSerivce;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnimalServiceImpl implements AnimalSerivce {

    private final AnimalRepository animalRepository;

    public AnimalServiceImpl(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @Override
    public Animal createReview(Animal animal) {
        return this.animalRepository.save(animal);
    }

    @Override
    public Animal updateReview(Animal animal) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsById(animal.getId())) {
            throw new AnimalNotFoundExeption("Review with id `" + animal.getId() + "` not found");
        }

        return this.animalRepository.save(animal);
    }

    @Override
    public Animal getReview(Long id) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsById(id)) {
            throw new AnimalNotFoundExeption("Review with id `" + id + "` not found");
        }

        Optional<Animal> optionalReview = this.animalRepository.findById(id);
        return optionalReview.orElse(null);
    }

    @Override
    public List<Animal> getReviewsByUniversityId(Long universityId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByAnimalCenterId(universityId)) {
            throw new AnimalNotFoundExeption("Reviews with university id `" + universityId + "` not found");
        }

        return this.animalRepository.findAllByAnimalCenterId(universityId);
    }

    @Override
    public List<Animal> getReviewsByAuthorId(Long authorId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByAuthorId(authorId)) {
            throw new AnimalNotFoundExeption("Reviews with author id `" + authorId + "` not found");
        }

        return this.animalRepository.findAllByAuthorId(authorId);
    }

    @Override
    public List<Animal> getReviewsByUniversityIdAndAuthorId(Long universityId, Long authorId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByAnimalCenterIdAndAuthorId(universityId, authorId)) {
            throw new AnimalNotFoundExeption("Reviews with university id `" + universityId + "` and author id `" + authorId + "` not found");
        }

        return this.animalRepository.findAllByAnimalCenterIdAndAuthorId(universityId, authorId);
    }

    @Override
    public List<Animal> getReviews() {
        return this.animalRepository.findAll();
    }

    @Override
    public void deleteReview(Long id) {
        this.animalRepository.deleteById(id);
    }

    @Override
    public Animal likeReview(Long reviewId, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getReview(reviewId);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Review with id `" + reviewId + "` not found");
        }

        if (!animal.addLike(userId)) {
            animal.removeLike(userId);
        }

        this.animalRepository.save(animal);
        return animal;
    }

    @Override
    public Animal dislikeReview(Long reviewId, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getReview(reviewId);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Review with id `" + reviewId + "` not found");
        }

        animal.removeLike(userId);

        this.animalRepository.save(animal);
        return animal;
    }

    @Override
    public boolean getLikeStatus(Long reviewId, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getReview(reviewId);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Review with id `" + reviewId + "` not found");
        }

        return animal.isLikedBy(userId);
    }

    @Override
    public List<Animal> getLikedReviews(Long userId) {
        List<Animal> animals = this.animalRepository.findAll();
        return animals.stream().filter((review) -> review.isLikedBy(userId)).collect(Collectors.toList());
    }
}
