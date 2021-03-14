import { Component, OnInit, Inject } from '@angular/core';
import { OrderTable } from 'src/app/shared/models/OrderTable';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TrackService } from 'src/app/shared/services/track.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrackResponse } from 'src/app/shared/models/track';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  shipmentStatus: TrackResponse;
  showSpinner: boolean = false;
  constructor(
    private trackService: TrackService,
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderTable) { }

  ngOnInit() {
    this.getTrackStatus();
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  getTrackStatus() {
    this.showSpinner = true;
    this.trackService.getShipmentStatus(this.data.awbNo).subscribe(data => {
      if (data.success) {
        this.shipmentStatus = data.data['track'];
      }
      this.showSpinner = false;
    }, err => {
      console.log(err);
      this.showSpinner = false;
    })
  }

}
