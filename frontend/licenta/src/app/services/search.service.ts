import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchFiltersSubject = new BehaviorSubject<any>({});
  searchFilters$ = this.searchFiltersSubject.asObservable();

  setSearchFilters(filters: any) {
    this.searchFiltersSubject.next(filters);
  }

  getSearchFilters() {
    return this.searchFiltersSubject.value;
  }
}
