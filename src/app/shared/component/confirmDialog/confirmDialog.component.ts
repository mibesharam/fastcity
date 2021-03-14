import { Component, OnInit, Inject } from '@angular/core';
import { IConfirmDialog } from '../../models/IConfirmDialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-confirmDialog',
  templateUrl: './confirmDialog.component.html',
  styleUrls: ['./confirmDialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialog) { }

  ngOnInit(): void {
    this.data.result = false;
  }

  onClickYes() {
    this.data.result = true;
    this.dialogRef.close(this.data.result);
  }
  onClickCancel() {
    this.data.result = false;
    this.dialogRef.close(this.data.result);
  }

}
