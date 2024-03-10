import { BehaviorSubject } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DogDataService {
  private dogSource = new BehaviorSubject<any>(null);
  currentDog = this.dogSource.asObservable();

  constructor() { }

  changeDogData(dog: any) {
    this.dogSource.next(dog);
  }
}
