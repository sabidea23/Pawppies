package licenta.service.implementation;

import licenta.exeptions.ReviewNotFoundException;
import licenta.model.Review;
import licenta.repo.ReviewRepository;
import licenta.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public Review createReview(Review review) {
        return this.reviewRepository.save(review);
    }

    @Override
    public Review updateReview(Review review) throws ReviewNotFoundException {
        if (!this.reviewRepository.existsById(review.getId())) {
            throw new ReviewNotFoundException("Review with id `" + review.getId() + "` not found");
        }

        return this.reviewRepository.save(review);
    }

    @Override
    public Review getReview(Long id) throws ReviewNotFoundException {
        if (!this.reviewRepository.existsById(id)) {
            throw new ReviewNotFoundException("Review with id `" + id + "` not found");
        }

        Optional<Review> optionalReview = this.reviewRepository.findById(id);
        return optionalReview.orElse(null);
    }

    @Override
    public List<Review> getReviewsByUniversityId(Long universityId) throws ReviewNotFoundException {
        if (!this.reviewRepository.existsByUniversityId(universityId)) {
            throw new ReviewNotFoundException("Reviews with university id `" + universityId + "` not found");
        }

        return this.reviewRepository.findAllByUniversityId(universityId);
    }

    @Override
    public List<Review> getReviewsByAuthorId(Long authorId) throws ReviewNotFoundException {
        if (!this.reviewRepository.existsByAuthorId(authorId)) {
            throw new ReviewNotFoundException("Reviews with author id `" + authorId + "` not found");
        }

        return this.reviewRepository.findAllByAuthorId(authorId);
    }

    @Override
    public List<Review> getReviewsByUniversityIdAndAuthorId(Long universityId, Long authorId) throws ReviewNotFoundException {
        if (!this.reviewRepository.existsByUniversityIdAndAuthorId(universityId, authorId)) {
            throw new ReviewNotFoundException("Reviews with university id `" + universityId + "` and author id `" + authorId + "` not found");
        }

        return this.reviewRepository.findAllByUniversityIdAndAuthorId(universityId, authorId);
    }

    @Override
    public List<Review> getReviews() {
        return this.reviewRepository.findAll();
    }

    @Override
    public void deleteReview(Long id) {
        this.reviewRepository.deleteById(id);
    }

    @Override
    public Review likeReview(Long reviewId, Long userId) throws ReviewNotFoundException {
        Review review = this.getReview(reviewId);
        if (review == null) {
            throw new ReviewNotFoundException("Review with id `" + reviewId + "` not found");
        }

        if (!review.addLike(userId)) {
            review.removeLike(userId);
        }

        this.reviewRepository.save(review);
        return review;
    }

    @Override
    public Review dislikeReview(Long reviewId, Long userId) throws ReviewNotFoundException {
        Review review = this.getReview(reviewId);
        if (review == null) {
            throw new ReviewNotFoundException("Review with id `" + reviewId + "` not found");
        }

        review.removeLike(userId);

        this.reviewRepository.save(review);
        return review;
    }

    @Override
    public boolean getLikeStatus(Long reviewId, Long userId) throws ReviewNotFoundException {
        Review review = this.getReview(reviewId);
        if (review == null) {
            throw new ReviewNotFoundException("Review with id `" + reviewId + "` not found");
        }

        return review.isLikedBy(userId);
    }

    @Override
    public List<Review> getLikedReviews(Long userId) {
        List<Review> reviews = this.reviewRepository.findAll();
        return reviews.stream().filter((review) -> review.isLikedBy(userId)).collect(Collectors.toList());
    }
}
