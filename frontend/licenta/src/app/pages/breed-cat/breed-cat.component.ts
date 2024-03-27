import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Breed_detailsService} from "../../services/breed_details.service";

@Component({
  selector: 'app-breed-cat', templateUrl: './breed-cat.component.html', styleUrls: ['./breed-cat.component.css']
})
export class BreedCatComponent {
  cat: any;

  catId: any;

  constructor(private route: ActivatedRoute, private breedDetailsService: Breed_detailsService) {
  }

  searchDogByBreedId() {
    this.breedDetailsService.getBreedDetailsById(this.catId)
      .subscribe(data => {
        this.cat = data
        console.log(this.cat)

      }, error => {
        console.log(error.error.message);
      });
  }

  ngOnInit() {
    this.catId = JSON.parse(this.route.snapshot.paramMap.get('catBreedId') || 'null') || undefined;
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
}
