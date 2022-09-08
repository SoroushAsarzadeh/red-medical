import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  /** Implement Search Form */
  searchForm: FormGroup;
  rolls: string[] = ['Patient', 'Practitioner'];
  @Output() submitSearch = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      personName: new FormControl(null, this.forbiddenNames.bind(this)),
      personRoll: new FormControl(null)
    });
  }

  onSubmit(): void {
    this.submitSearch.emit(this.searchForm);
  }

  forbiddenNames() {
    if(this.searchForm.value.personName.includes('ä') || this.searchForm.value.personName.includes('ö') || this.searchForm.value.personName.includes('ü')) {
      return true;
    }
    return null;
  }
}
