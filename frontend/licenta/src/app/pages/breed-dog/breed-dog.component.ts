import {Component, OnInit} from '@angular/core';
import {DogDataService} from "../../services/dog-data.service";

@Component({
  selector: 'app-breed-dog', templateUrl: './breed-dog.component.html', styleUrls: ['./breed-dog.component.css']
})

export class BreedDogComponent implements OnInit {
  dog: any;

  constructor(private dogDataService: DogDataService) {
  }

  ngOnInit() {
    this.dogDataService.currentDog.subscribe(dog => {
      if (dog) {
        this.dog = dog;
      } else {
        console.log('No dog data available');
      }
    });
    this.dog.heath = this.formatDogHealthCorrectSplit(this.dog.heath);
  }

  selectedContent: string = 'personality';

  selectContent(option: string) {
    this.selectedContent = option;
  }

   formatDogHealthCorrectSplit(text: string): string {
     // Split text based on the specific keywords
     const keywords = ['Minor', 'Occasionally', 'Suggested', 'Lifespan'];
     const regex = new RegExp(`(?<=\\.|\\!|\\?)(?=\\s+(${keywords.join('|')}))`, 'g');
     const sentences = text.split(regex);
     // Join the sentences back, separating them with a newline character
     return sentences.join('\n');
   }

}
