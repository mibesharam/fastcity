import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, NgForm } from '@angular/forms';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { OrderService } from './order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddressService } from 'src/app/shared/services/address.service';
import { Addresslist } from 'src/app/shared/models/addresslist';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { map, debounceTime } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirmDialog/confirmDialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  placeId: string;
  addressList$: Observable<Addresslist[]>;
  orderPrice: number;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private logging: LoggingService,
    private authService: AuthService,
    private addressServ: AddressService,
    private spinner: NgxSpinnerService,
    private service: OrderService) { }

  ngOnInit() {
    this.initializeForm();
    this.getBasePrice();
    this.getPendingOrder();
  }

  initializeForm() {
    this.orderForm = this.fb.group({
      isSchedule: [false],
      weight: [0.5, [Validators.required]],
      inside: ['', [Validators.required]],
      rate: [60],
      pickupPlaceId: ['', [Validators.required]],
      pickupAddr: ['', [Validators.required]],
      pickupNote: ['', [Validators.required]],
      pickupContactNo: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      pickupContactName: ['', [Validators.required]],
      pickupPincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      pickupDate: [new Date(), [Validators.required]],
      pickupTime: [`${this.getCurrentHours()}:${this.getCurrentMinutes()}`, [Validators.required]],
      deliveryPoints: this.fb.array([this.newDeliveryPoint()])
    });

    this.orderPrice = this.orderForm.get('rate').value;
    this.orderForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(data => {
      if (this.orderForm.valid) {
        if (this.validateSameLocations()) {
          this.service.getOrderPrice(this.orderForm.value).subscribe(data => {
            if (data.success) {
              this.orderPrice = data.data['rate'];
            } else {
              this.logging.log(data.message);
            }
          })
        }

      }
    });
  }

  getPendingOrder() {
    const formValue = localStorage.getItem('pendingOrder');
    if (formValue) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent,
        { data: { title: 'Confirm', message: 'You have a pending order, Do you want to complete it ?' } });

      //dialog result
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.orderForm.patchValue(JSON.parse(formValue));
        }
      })
    }
  }

  //#region controls
  get DeliveryPoints(): FormArray {
    return this.orderForm.get('deliveryPoints') as FormArray;
  }
  get isSchedule(): FormControl {
    return this.orderForm.get('isSchedule') as FormControl;
  }
  get Weight(): FormControl {
    return this.orderForm.get('weight') as FormControl;
  }

  get rate(): FormControl {
    return this.orderForm.get('rate') as FormControl;
  }
  //#endregion

  newDeliveryPoint() {
    return this.fb.group({
      deliveryPlaceId: ['', [Validators.required]],
      deliveryAddr: ['', [Validators.required]],
      deliveryNote: ['', [Validators.required]],
      deliveryContactNo: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      deliveryContactName: ['', [Validators.required]],
      deliveryDate: [new Date(), [Validators.required]],
      deliveryTime: [`${this.getCurrentHours()}:${this.getCurrentMinutes()}`, [Validators.required]],
      deliveryPincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]]
    });
  }

  onAddDeliveryPoint() {
    this.DeliveryPoints.push(this.newDeliveryPoint());
  }
  onRemoveDeliveryPoint(i: number) {
    this.DeliveryPoints.removeAt(i);
  }

  onUpdateScheduleBtn(isScheduleP: boolean) {
    this.orderForm.patchValue({
      isSchedule: isScheduleP
    });
    this.logging.log(this.isSchedule.value);
  }

  onUpdateWeight(weightP: number) {
    this.orderForm.patchValue({
      weight: weightP
    });
    // this.logging.log(this.Weight.value);
  }
  onUpdateInside(doc: string) {
    this.orderForm.patchValue({
      inside: doc
    });
  }

  onKeyupPickupAddress(event) {
    const keyCode = event.keyCode;
    if (keyCode !== 40 && keyCode !== 38 && keyCode !== 13) {
      const pickupAddr: string = this.orderForm.get('pickupAddr').value;
      if (pickupAddr && pickupAddr.length > 3) {
        this.addressList$ = this.addressServ.getAddressList(pickupAddr);
      }
    }
  }

  onChangePickupAddress(event) {
    // setTimeout(() => {
    if (this.placeId === '' || this.placeId == null) {
      this.orderForm.patchValue({
        pickupPlaceId: '',
        pickupAddr: ''
      });
      this.logging.notify('Please Select Address From List');
    } else {
      this.service.getPincode(this.placeId).subscribe(data => {
        if (data.success) {
          this.orderForm.patchValue({
            pickupPincode: data.data
          });
        } else {
          this.orderForm.patchValue({
            pickupPlaceId: '',
            pickupAddr: '',
            pickupPincode: ''
          });
          this.logging.notify('Please Enter Precise location');
        }
      }, err => {
        this.orderForm.patchValue({
          pickupPlaceId: '',
          pickupAddr: '',
          pickupPincode: ''
        });
        this.logging.notify('Error while getting Pincode');
      })
    }


    // }, 500);

  }

  onSelectPickupOption(event: MatAutocompleteSelectedEvent) {
    this.placeId = event.option.id;
    this.orderForm.patchValue({
      pickupPlaceId: this.placeId
    })
  }

  onChangeDeliveryAddress(event, i: number) {

    // setTimeout(() => {
    if (this.placeId == '' || this.placeId == null) {
      (this.orderForm.get('deliveryPoints') as FormArray).at(i).patchValue({
        deliveryPlaceId: '',
        deliveryAddr: ''
      });
      // this.snakebar.open('Please Select Address From List', 'ok', { dura });
      this.logging.notify('Please Select Address From List');
    } else {
      //getting pincode from api
      this.service.getPincode(this.placeId).subscribe(data => {
        if (data.success) {
          (this.orderForm.get('deliveryPoints') as FormArray).at(i).patchValue({
            deliveryPincode: data.data
          });
        } else {
          (this.orderForm.get('deliveryPoints') as FormArray).at(i).patchValue({
            deliveryPlaceId: '',
            deliveryAddr: '',
            deliveryPincode: ''
          });
          this.logging.notify('Please Enter Precise location');
        }
      }, err => {
        (this.orderForm.get('deliveryPoints') as FormArray).at(i).patchValue({
          deliveryPlaceId: '',
          deliveryAddr: '',
          deliveryPincode: ''
        });
        this.logging.notify('Error while getting Pincode');
      })
    }
    this.validateSameLocations();
    // }, 500);
  }

  onKeyupDeliveryAddress(event, i) {
    const keyCode = event.keyCode;
    if (keyCode !== 40 && keyCode !== 38 && keyCode !== 13) {
      const deliveryAddr: string = (this.orderForm.get('deliveryPoints') as FormArray).at(i).get('deliveryAddr').value;
      if (deliveryAddr && deliveryAddr.length > 3) {
        this.addressList$ = this.addressServ.getAddressList(deliveryAddr);
      }
    }
  }
  onSelectDeiveryOption(event: MatAutocompleteSelectedEvent, i: number) {
    this.placeId = event.option.id;
    (this.orderForm.get('deliveryPoints') as FormArray).at(i).patchValue({
      deliveryPlaceId: this.placeId
    });
  }

  getBasePrice() {
    this.spinner.show();
    this.service.getBasePrice().subscribe(data => {
      if (data.success) {
        this.orderPrice = data.data;
        this.orderForm.patchValue({
          rate: data.data
        })
      }
      this.spinner.hide();
    }, err => {
      this.logging.log(err);
      this.spinner.hide();
    })
  }

  onSubmitOrder(form) {
    if (form.valid) {
      this.logging.log(this.orderForm);
      this.spinner.show();

      localStorage.setItem('pendingOrder', JSON.stringify(this.orderForm.value));
      this.authService.isLogin().subscribe(data => {
        if (data) {
          this.service.NewPickupRequest(this.orderForm.value).subscribe(data => {
            if (data.success) {
              this.logging.notify('Your Order generated SuccessFully');
              localStorage.removeItem('pendingOrder');
              form.resetForm();
              this.getBasePrice();
            } else {
              this.logging.notify(data.message);
            }
            this.spinner.hide();
          })
        } else {
          localStorage.setItem('pendingOrder', JSON.stringify(this.orderForm.value));
          this.spinner.hide();
          this.router.navigate(['/login'], { queryParams: { returnUrl: '/order' } });
        }
      })
    } else {
      this.logging.notify('Invalid Request! Please Provide valid inputs');
    }
  }

  //#region  Helper functions


  getCurrentHours() {
    let hh = new Date().getHours().toString();
    if (hh.length < 2) {
      hh = '0' + hh;
    }
    return hh;
  }


  getCurrentMinutes() {
    let mm = new Date().getMinutes().toString();
    if (mm.length < 2) {
      mm = '0' + mm;
    }
    return mm;
  }

  validateSameLocations(): boolean {
    console.log('validation called');
    const pickupPlaceId = this.orderForm.get('pickupPlaceId').value;
    const deliveryPoints = (this.orderForm.get('deliveryPoints') as FormArray);
    let res = true;
    for (let control of deliveryPoints.controls) {
      if (control instanceof FormGroup) {
        //check for same placeid
        const dplaceId = control.get('deliveryPlaceId').value;
        if (dplaceId === pickupPlaceId) {
          res = false;
          control.get('deliveryAddr').setErrors({ match: true });
        }
      }
    }
    return res;
  }

  //#endregion

  //#region validations

  getPickupAddrError() {
    const pickupAddr = this.orderForm.get('pickupAddr');
    const pickupPlaceId = this.orderForm.get('pickupPlaceId');
    if (pickupAddr.hasError('required')) {
      return 'Pickup Address is Required';
    }

    if (pickupPlaceId.hasError('required')) {
      this.orderForm.patchValue({ pickupAddr: '' });
      return 'Pickup Address is Required';
    }
  }

  getPickupContactNoError() {
    const pickupContact = this.orderForm.get('pickupContactNo');
    if (pickupContact.hasError('required')) {
      return 'Contact No is Required';
    }

    if (pickupContact.hasError('pattern')) {
      return 'Invalid Contact No';
    }
  }

  getPickupContactNameError() {
    const pickupContact = this.orderForm.get('pickupContactName');
    if (pickupContact.hasError('required')) {
      return 'Contact Name is Required';
    }


  }

  getPickupPincodeError() {
    const pickupPincode = this.orderForm.get('pickupPincode');
    if (pickupPincode.hasError('required')) {
      return 'Pincode is Required';
    }

    if (pickupPincode.hasError('pattern')) {
      return 'Invalid Pincode';
    }
  }

  getPickupNoteError() {
    const pickupNote = this.orderForm.get('pickupNote');
    if (pickupNote.hasError('required')) {
      return 'Description is Required';
    }
  }

  //delivery points validations

  get deliveryPoints(): FormArray {
    return this.orderForm.get('deliveryPoints') as FormArray;
  }
  getDeliveryAddrError(i: number) {
    const deliveryAddr = (this.orderForm.get('deliveryPoints') as FormArray).at(i).get('deliveryAddr');
    const deliveryPlaceId = (this.orderForm.get('deliveryPoints') as FormArray).at(i).get('deliveryPlaceId');
    if (deliveryAddr.hasError('required')) {
      return 'Delivery is Required';
    }

    if (deliveryAddr.hasError('match')) {
      return 'Delivery Address cannot be equal to Pickup Address';
    }

    if (deliveryPlaceId.hasError('required')) {
      deliveryAddr.setValue('');
      return 'Delivery is Required';
    }
  }
  getDeliveryContactNoError(i: number) {
    const deliveryContact = (this.orderForm.get('deliveryPoints') as FormArray).at(i).get('deliveryContactNo');
    if (deliveryContact.hasError('required')) {
      return 'Contact No is Required';
    }
    if (deliveryContact.hasError('pattern')) {
      return 'Invalid Contact No';
    }
  }

  getDeliveryContactNameError(i: number) {
    const deliveryContactName = (this.orderForm.get('deliveryPoints') as FormArray).at(i).get('deliveryContactName');
    if (deliveryContactName.hasError('required')) {
      return 'Name is Required';
    }
  }

  getDeliveryPincodeError(i: number) {
    const deliveryPincode = (this.orderForm.get('deliveryPoints') as FormArray).at(i).get('deliveryPincode');
    if (deliveryPincode.hasError('required')) {
      return 'Pincode is Required';
    }
    if (deliveryPincode.hasError('pattern')) {
      return 'Invalid Pincode';
    }
  }

  getDeliveryDescriptionError(i: number) {
    const deliveryNote = (this.orderForm.get('deliveryPoints') as FormArray).at(i).get('deliveryNote');
    if (deliveryNote.hasError('required')) {
      return 'Description is Required';
    }
  }

  getInsideError() {
    const inside = this.orderForm.get('inside');
    if (inside.hasError('required')) {
      return 'Whats inside is Required';
    }
  }


  //#endregion

}
