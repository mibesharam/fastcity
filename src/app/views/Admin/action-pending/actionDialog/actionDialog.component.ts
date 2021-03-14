import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionPendingService } from '../action-pending.service';
import { OrderTable } from 'src/app/shared/models/OrderTable';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { FormControl } from '@angular/forms';

interface IDialogData {
  id: number;
  awbNo: string;
}

interface ActionReq {
  OrderId: number;
  CourierId: number;
  SendNotification: boolean;
  IsApproved: boolean;
  Remarks: string;
  IsClientPickup: boolean;
  BranchId: number;
}

@Component({
  selector: 'app-actionDialog',
  templateUrl: './actionDialog.component.html',
  styleUrls: ['./actionDialog.component.scss']
})
export class ActionDialogComponent implements OnInit {
  showSpinner: boolean = false;
  orderData: OrderTable;
  notifyClient: boolean = true;
  courierMedium: string = 'OUR';
  availabelCouriers: any[] = [];
  selectedCourier: number = 0;
  approved: number = 1;
  rejectRemark: string = '';
  Branches: any[];
  selectedBranch: number = 0;
  isClientPickup: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private service: ActionPendingService,
    private logging: LoggingService,
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit() {
    this.getOrderDtl();
  }

  onClickCancel() {
    this.dialogRef.close(false);
  }

  getOrderDtl() {
    this.showSpinner = true;
    this.service.getOrderDtl(this.data.id, this.data.awbNo).subscribe(data => {
      if (data.success) {
        this.orderData = data.data.order;
        this.selectCourierService();
      } else {
        this.dialogRef.close(false);
      }
      this.showSpinner = false;
    }, err => {
      console.log(err);
      this.showSpinner = false;
    })

  }

  selectCourierService() {
    if (this.orderData.p_City == this.orderData.d_City && this.orderData.p_City == "Surat") {
      this.courierMedium = 'OUR';
    } else {
      this.courierMedium = 'TPS';
      this.onChangeCourierMedium(this.courierMedium);
      this.getBranches();
    }
  }

  onChangeCourierMedium(event) {
    if (event === 'TPS') {
      this.availabelCouriers = [];
      this.spinner.show();
      this.service.getAvailabelCouriersInfo(this.orderData).subscribe(data => {
        if (data.success) {
          this.availabelCouriers = data.data.available_courier_companies;
          if (data.data.recommended_courier_company_id) {
            const i = this.availabelCouriers.findIndex(c => c.courier_company_id == data.data.recommended_courier_company_id);
            this.selectedCourier = this.availabelCouriers[i].courier_company_id;
          }
        } else {
          this.logging.notify(data.message);
        }
        this.spinner.hide();
      }, err => {
        this.logging.log(err);
        this.spinner.hide();
      });

    }
  }

  getEstimatedDate() {
    if (this.selectedCourier !== 0) {
      return this.availabelCouriers.filter(c => c.courier_company_id == this.selectedCourier)[0].etd;
    } else {
      return 'NA';
    }
  }

  validateForm() {
    if (this.courierMedium === 'TPS' && this.selectedCourier == 0) {
      this.logging.notify('Please Select Courier');
      return false;
    }

    if (this.approved === 0 && this.rejectRemark === '') {
      this.logging.notify('Please Enter Remarks');
      return false;
    }

    if (this.courierMedium === 'TPS' && !this.isClientPickup && this.selectedBranch === 0) {
      this.logging.notify('Please Select Branch');
      return false;
    }


    return true;
  }

  getBranches() {
    this.showSpinner = true;
    this.service.getBranches().subscribe(data => {
      if (data.success) {
        this.Branches = data.data.branch;
        this.selectedBranch = this.Branches[0].id;
      } else {
        this.logging.notify(data.message);
      }
      this.showSpinner = false;
    }, err => {
      this.showSpinner = false;
      this.logging.log(err);
    })
  }

  onApprovedCourier() {
    //validation
    if (this.validateForm()) {
      let obj: ActionReq = {
        OrderId: this.orderData.id,
        CourierId: this.selectedCourier,
        Remarks: this.rejectRemark,
        IsApproved: Boolean(this.approved),
        SendNotification: this.notifyClient,
        IsClientPickup: this.isClientPickup,
        BranchId: this.selectedBranch
      };
      this.service.submitOrderAction(obj).subscribe(data => {
        if (data.success) {
          this.logging.notify(data.message);
          this.dialogRef.close();
        } else {
          this.logging.notify(data.message);
        }
        this.showSpinner = false;
      }, err => {
        this.logging.log(err);
        this.showSpinner = false;
      });
    }

  }

}
