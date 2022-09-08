import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.scss']
})
export class DetailPopupComponent implements OnInit, OnChanges {

  constructor(public dialogRef: MatDialogRef<DetailPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { console.log(this.data); }

  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
  }

}
