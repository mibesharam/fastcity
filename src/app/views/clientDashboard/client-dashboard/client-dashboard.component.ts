import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserProfile } from 'src/app/shared/models/userProfile';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { MatTabChangeEvent, MatTable, MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDashboardService } from './client-dashboard.service';
import { OrderTable } from 'src/app/shared/models/OrderTable';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

interface OrderReqForm {
  fromDate: Date;
  toDate: Date;
  orderFilter: Date;
}

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  addressStep: number = 0;
  userData: UserProfile;
  tabIndex: number = 0;
  filterForm: FormGroup;
  orderData: MatTableDataSource<OrderTable>;
  @ViewChild('listTable', { static: false }) ListTable: MatTable<any>;
  displayColumns: string[] = ['id', 'awbNo', 'insDt', 'product', 'weight', 'amount', 'status', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private logging: LoggingService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: ClientDashboardService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getUserProfile();
    this.initializeForm();

  }

  initializeForm() {
    let d = new Date();
    d.setDate(d.getDate() - 7);

    this.filterForm = this.fb.group({
      fromDate: [d, Validators.required],
      toDate: [new Date(), Validators.required],
      dateFilter: ['L1W', Validators.required],
      orderFilter: ['Pending', Validators.required]
    });
  }

  onChangeDateFilter(event) {
    let d = new Date();

    switch (event.value) {
      case 'L1M':
        d.setMonth(d.getMonth() - 1);
        this.filterForm.patchValue({ fromDate: d, toDate: new Date() });
        break;
      case 'L1W':
        d.setDate(d.getDate() - 7);
        this.filterForm.patchValue({ fromDate: d, toDate: new Date() });
        break;
      case 'L1Y':
        d.setFullYear(d.getFullYear() - 1);
        this.filterForm.patchValue({ fromDate: d, toDate: new Date() });
        break;
      case 'TOD':
        this.filterForm.patchValue({ fromDate: d, toDate: new Date() });
        break;
      case 'YEST':
        d.setDate(d.getDate() - 1);
        this.filterForm.patchValue({ fromDate: d, toDate: d });
        break;
    }
  }

  getUserProfile() {
    this.spinner.show();
    this.authService.getUserProfile().subscribe(data => {
      if (data.success) {
        this.userData = data.data['user'];
      } else {
        if (data.errorCode === 10003) {
          this.authService.logOut();
        }
        this.logging.notify(data.message);
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.logging.log(err);
    })
  }

  setStep(i) {
    this.addressStep = i;
  }

  onTabChanged(event: MatTabChangeEvent) {
    switch (event.index) {
      case 1:
        this.getUserOrders(this.filterForm.value);
        break;
    }
  }

  getUserOrders(form) {

    this.spinner.show();
    this.service.getUserOrder(form).subscribe(data => {
      if (data.success) {
        this.orderData = new MatTableDataSource(data.data['orders']);
        this.orderData.paginator = this.paginator;
        this.orderData.sort = this.sort;
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.logging.log(err);
    })
  }

  onSubmitForm(form) {
    this.getUserOrders(form.value);
  }

  openDetailDialog(element) {
    const dialogRef = this.dialog.open(OrderDetailComponent,
      { data: element });
  }

}
