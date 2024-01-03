package licenta.controller;

import licenta.exeptions.ReviewNotFoundException;
import licenta.model.ImageModel;
import licenta.model.Review;
import licenta.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/review")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping(value = {"/"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.CREATED)
    public Review createReview(@RequestPart("review") Review review,
                               @RequestPart("imageFile") MultipartFile[] file) {
        try {
            Set<ImageModel> imageModels = uploadImage(file);
            review.setReviewImages(imageModels);
            return this.reviewService.createReview(review);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();
        for (MultipartFile file:multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes());
            imageModels.add(imageModel);
        }
        return imageModels;
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

    @PutMapping("/{reviewId}/like/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Review likeReview(@PathVariable("reviewId") Long reviewId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.reviewService.likeReview(reviewId, userId);
    }

    @PutMapping("/{reviewId}/dislike/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Review dislikeReview(@PathVariable("reviewId") Long reviewId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.reviewService.dislikeReview(reviewId, userId);
    }

    @GetMapping("/{reviewId}/like-status/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public boolean getLikeStatus(@PathVariable("reviewId") Long reviewId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.reviewService.getLikeStatus(reviewId, userId);
    }

    @GetMapping("/liked-reviews/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Review> getLikedReviews(@PathVariable("userId") Long userId) throws Exception {
        return this.reviewService.getLikedReviews(userId);
    }
}
