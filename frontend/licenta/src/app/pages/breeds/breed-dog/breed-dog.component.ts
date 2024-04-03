import {Component, OnInit} from '@angular/core';
import {Breed_detailsService} from "../../../services/breed_details.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-breed-dog', templateUrl: './breed-dog.component.html', styleUrls: ['./breed-dog.component.css']
})

export class BreedDogComponent implements OnInit {
  dog: any;

  dogId: any;

  constructor(private route: ActivatedRoute,  private router: Router,  private breedDetailsService: Breed_detailsService) {
  }

  searchDogByBreedId() {
    this.breedDetailsService.getBreedDetailsById(this.dogId)
      .subscribe(data => {
        this.dog = data
        console.log(this.dog)

      }, error => {
        console.log(error.error.message);
      });
  }

  ngOnInit() {
    this.dogId = JSON.parse(this.route.snapshot.paramMap.get('dogBreedId') || 'null') || undefined;
    console.log(this.dogId)
    this.searchDogByBreedId();
  }

  selectedContent: string = 'personality';

  selectContent(option: string) {
    this.selectedContent = option;
  }

  formatDogHealthCorrectSplit(text: string): string {
    const keywords = ['Minor', 'Occasionally', 'Suggested', 'Lifespan'];
    const regex = new RegExp(`(?<=\\.|\\!|\\?)(?=\\s+(${keywords.join('|')}))`, 'g');
    const sentences = text.split(regex);
    return sentences.join('\n');
  }

  // @ts-ignore
  redirectToAnimalPage(dog) {
    // Presupunând că dog.breed conține rasa selectată
    this.router.navigate(['/animal/'], { queryParams: { type: 'Dog', breed: dog.name } });
  }
}
