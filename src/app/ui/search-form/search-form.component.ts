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
      personName: new FormControl(null, Validators.required),
      personRoll: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    this.submitSearch.emit(this.searchForm);
  }

}
