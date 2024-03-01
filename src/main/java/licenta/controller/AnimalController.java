package licenta.controller;

import licenta.exeptions.AnimalNotFoundExeption;
import licenta.model.Animal;
import licenta.model.ImageModel;
import licenta.service.AnimalSerivce;
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
public class AnimalController {

    private final AnimalSerivce animalSerivce;

    public AnimalController(AnimalSerivce animalSerivce) {
        this.animalSerivce = animalSerivce;
    }

    @PostMapping(value = {"/"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal createReview(@RequestPart("review") Animal animal,
                               @RequestPart("imageFile") MultipartFile[] file) {
        try {
            Set<ImageModel> imageModels = uploadImage(file);
            animal.setReviewImages(imageModels);
            return this.animalSerivce.createReview(animal);
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
    public Animal updateReview(@RequestBody Animal requestBodyAnimal) throws Exception {
        Animal originalAnimal = this.animalSerivce.getReview(requestBodyAnimal.getId());
        if (originalAnimal == null) {
            throw new AnimalNotFoundExeption("Review with id `" + requestBodyAnimal.getId() + "` not found");
        }

        originalAnimal.setAge(requestBodyAnimal.getAge());
        originalAnimal.setBreed(requestBodyAnimal.getName());
        originalAnimal.setName(requestBodyAnimal.getName());

        return this.animalSerivce.updateReview(originalAnimal);
    }

    @GetMapping("/{reviewId}")
    @ResponseStatus(code = HttpStatus.OK)
    public Animal getReviewById(@PathVariable("reviewId") Long reviewId) throws Exception {
        return this.animalSerivce.getReview(reviewId);
    }

    @GetMapping("/university/{universityId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getReviewsByUniversityId(@PathVariable("universityId") Long universityId) throws Exception {
        return this.animalSerivce.getReviewsByUniversityId(universityId);
    }

    @GetMapping("/author/{authorId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getReviewsByAuthorId(@PathVariable("authorId") Long authorId) throws Exception {
        return this.animalSerivce.getReviewsByAuthorId(authorId);
    }

    @GetMapping("/university/{universityId}/author/{authorId}")
    public List<Animal> getReviewsByUniversityIdAndAuthorId(@PathVariable("universityId") Long universityId,
                                                            @PathVariable("authorId") Long authorId) throws Exception {
        return this.animalSerivce.getReviewsByUniversityIdAndAuthorId(universityId, authorId);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAllReviews() {
        return this.animalSerivce.getReviews();
    }

    @DeleteMapping("/{reviewId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteReviewById(@PathVariable("reviewId") Long reviewId) {
        this.animalSerivce.deleteReview(reviewId);
    }

    @PutMapping("/{reviewId}/like/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal likeReview(@PathVariable("reviewId") Long reviewId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalSerivce.likeReview(reviewId, userId);
    }

    @PutMapping("/{reviewId}/dislike/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal dislikeReview(@PathVariable("reviewId") Long reviewId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalSerivce.dislikeReview(reviewId, userId);
    }

    @GetMapping("/{reviewId}/like-status/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public boolean getLikeStatus(@PathVariable("reviewId") Long reviewId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalSerivce.getLikeStatus(reviewId, userId);
    }

    @GetMapping("/liked-reviews/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getLikedReviews(@PathVariable("userId") Long userId) throws Exception {
        return this.animalSerivce.getLikedReviews(userId);
    }
}
