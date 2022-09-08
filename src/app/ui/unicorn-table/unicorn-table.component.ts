import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUnicornTableColumn } from '../models';
import { IFhirPatient, IFhirPractitioner } from '@red-probeaufgabe/types';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';

@Component({
  selector: 'app-unicorn-table',
  templateUrl: './unicorn-table.component.html',
  styleUrls: ['./unicorn-table.component.scss'],
})
export class UnicornTableComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<IFhirPatient | IFhirPractitioner> = new MatTableDataSource([]);
  filteredData = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>();
  @Input() totalLength = 0;
  @Input() isLoading = false;

  @Input()
  set entries(value: Array<IFhirPatient | IFhirPractitioner>) {
    this.dataSource.data = value;
  }

  @Input() searchFilters: FormGroup;

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dataSource?.data) {
      this.filteredData = this.dataSource.data.slice();
    }

    if (changes?.['searchFilters']?.currentValue) {
      this.applySearchFilters();
    }

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(row) {
    this.dialog.open(DetailPopupComponent, {
      width: '500px',
      data: this.mapData(row)
    });
  }

  mapData(data) {
    let mappedData;
    if (data.resourceType === 'Patient') {
      mappedData = {
        resourceType: data.resourceType,
        name: (data.name[0].given?.join(' ') || '') + ' ' + (data.name[0].family || ''),
        id: data.id,
        birthdate: data.birthDate,
        gender: data.gender,
      }
    } else if (data.resourceType === 'Practitioner') {
      mappedData = {
        resourceType: data.resourceType,
        name: (data.name[0].given?.join(' ') || '') + ' ' + (data.name[0].family || ''),
        id: data.id,
      }
    }
    return mappedData;
  }

  applySearchFilters() {
    if (this.searchFilters.value.personName) {
      this.filteredData = this.dataSource.data.filter(el =>
        el.name[0].family?.includes(this.searchFilters.value.personName) ||
        el.name[0].given?.includes(this.searchFilters.value.personName)
      );
    }
    if (this.searchFilters.value.personRoll) {
      this.filteredData = this.filteredData.filter(el => this.searchFilters.value.personRoll.includes(el.resourceType));
    }
  }
}
