package licenta.service;

import licenta.model.Animal;

import java.util.List;

public interface AnimalSerivce {
    Animal createReview(Animal animal);

    Animal updateReview(Animal animal) throws Exception;

    Animal getReview(Long id) throws Exception;

    List<Animal> getReviewsByUniversityId(Long universityId) throws Exception;

    List<Animal> getReviewsByAuthorId(Long authorId) throws Exception;

    List<Animal> getReviewsByUniversityIdAndAuthorId(Long universityId, Long authorId) throws Exception;

    List<Animal> getReviews();

    void deleteReview(Long id);

    Animal likeReview(Long reviewId, Long userId) throws Exception;

    Animal dislikeReview(Long reviewId, Long userId) throws Exception;

    boolean getLikeStatus(Long reviewId, Long userId) throws Exception;

    List<Animal> getLikedReviews(Long userId) throws Exception;
}
