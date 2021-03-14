import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrackService } from 'src/app/shared/services/track.service';
import { TrackResponse } from 'src/app/shared/models/track';
import { LoggingService } from 'src/app/shared/services/logging.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  awbNo: string;
  shipmentStatus: TrackResponse;

  constructor(
    private logging: LoggingService,
    private trackService: TrackService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const awbNo = this.route.snapshot.queryParams.awbNo;
    if (awbNo) {
      this.awbNo = awbNo;
      this.getShipmentStatus();
    }

  }

  getShipmentStatus() {
    this.spinner.show();
    this.trackService.getShipmentStatus(this.awbNo).subscribe(data => {
      if (data.success) {
        this.shipmentStatus = data.data['track'];
      } else {
        this.logging.notify(data.message);
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

  onClickGetStatus() {
    if (!this.awbNo || this.awbNo === '') {
      this.logging.notify('Please Enter Awb No');
    } else {
      this.getShipmentStatus();
    }
  }

  onKeydownAwbNo(event) {
    this.shipmentStatus = null;

  }

}
