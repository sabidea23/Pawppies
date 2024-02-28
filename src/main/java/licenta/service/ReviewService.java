package licenta.service;

import licenta.model.Review;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ReviewService {
    Review createReview(Review review);

    Review updateReview(Review review) throws Exception;

    Review getReview(Long id) throws Exception;

    List<Review> getReviewsByUniversityId(Long universityId) throws Exception;

    List<Review> getReviewsByAuthorId(Long authorId) throws Exception;

    List<Review> getReviewsByUniversityIdAndAuthorId(Long universityId, Long authorId) throws Exception;

    List<Review> getReviews();

    void deleteReview(Long id);

    Review likeReview(Long reviewId, Long userId) throws Exception;

    Review dislikeReview(Long reviewId, Long userId) throws Exception;

    boolean getLikeStatus(Long reviewId, Long userId) throws Exception;

    List<Review> getLikedReviews(Long userId) throws Exception;
}
