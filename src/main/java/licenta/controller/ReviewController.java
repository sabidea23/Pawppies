package licenta.controller;

import licenta.exeptions.ReviewNotFoundException;
import licenta.model.Review;
import licenta.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/review")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Review createReview(@RequestBody Review review) {
        return this.reviewService.createReview(review);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Review updateReview(@RequestBody Review requestBodyReview) throws Exception {
        Review originalReview = this.reviewService.getReview(requestBodyReview.getId());
        if (originalReview == null) {
            throw new ReviewNotFoundException("Review with id `" + requestBodyReview.getId() + "` not found");
        }

        originalReview.setText(requestBodyReview.getText());

        return this.reviewService.updateReview(originalReview);
    }

    @GetMapping("/{reviewId}")
    @ResponseStatus(code = HttpStatus.OK)
    public Review getReviewById(@PathVariable("reviewId") Long reviewId) throws Exception {
        return this.reviewService.getReview(reviewId);
    }

    @GetMapping("/university/{universityId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Review> getReviewsByUniversityId(@PathVariable("universityId") Long universityId) throws Exception {
        return this.reviewService.getReviewsByUniversityId(universityId);
    }

    @GetMapping("/author/{authorId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Review> getReviewsByAuthorId(@PathVariable("authorId") Long authorId) throws Exception {
        return this.reviewService.getReviewsByAuthorId(authorId);
    }

    @GetMapping("/university/{universityId}/author/{authorId}")
    public List<Review> getReviewsByUniversityIdAndAuthorId(@PathVariable("universityId") Long universityId,
            @PathVariable("authorId") Long authorId) throws Exception {
        return this.reviewService.getReviewsByUniversityIdAndAuthorId(universityId, authorId);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Review> getAllReviews() {
        return this.reviewService.getReviews();
    }

    @DeleteMapping("/{reviewId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteReviewById(@PathVariable("reviewId") Long reviewId) {
        this.reviewService.deleteReview(reviewId);
    }

}
