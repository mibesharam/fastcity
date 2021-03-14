import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionPendingService } from './action-pending.service';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { OrderTable } from 'src/app/shared/models/OrderTable';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTable, MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ActionDialogComponent } from './actionDialog/actionDialog.component';

@Component({
  selector: 'app-action-pending',
  templateUrl: './action-pending.component.html',
  styleUrls: ['./action-pending.component.scss']
})
export class ActionPendingComponent implements OnInit {
  data: MatTableDataSource<OrderTable>;
  @ViewChild('listTable', { static: false }) ListTable: MatTable<any>;
  displayColumns: string[] = ['id', 'awbNo', 'insDt', 'isSameDay', 'product', 'weight', 'amount', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private service: ActionPendingService,
    private logging: LoggingService) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.spinner.show();
    this.service.getActionPendingOrder().pipe(
      tap(c => this.spinner.show()),
      map(res => {
        this.spinner.hide();
        if (res.success) {
          return res.data;
        } else {
          this.logging.notify(res.message);
          return of([]);
        }
      }),
      tap(c => this.spinner.hide())
    ).subscribe(data => {
      this.data = new MatTableDataSource(data);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      this.spinner.hide();
    });

  }

  refreshTable() {
    this.LoadData();
  }

  openActionDialog(element: OrderTable) {
    const dialogRef = this.dialog.open(ActionDialogComponent,
      { data: { id: element.id, awbNo: element.awbNo } });

    dialogRef.afterClosed().subscribe(data => this.LoadData());

  }


}
