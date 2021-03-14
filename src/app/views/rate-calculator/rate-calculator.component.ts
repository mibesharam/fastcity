import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AddressService } from 'src/app/shared/services/address.service';
import { Observable } from 'rxjs';
import { Addresslist } from 'src/app/shared/models/addresslist';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { ShippingRate } from 'src/app/shared/models/ShippingRate';


@Component({
  selector: 'app-rate-calculator',
  templateUrl: './rate-calculator.component.html',
  styleUrls: ['./rate-calculator.component.scss']
})
export class RateCalculatorComponent implements OnInit {

  CalForm: FormGroup;
  addressList: Addresslist[] = [];
  addressList$: Observable<Addresslist[]>;

  showPrice: boolean = false;
  pickupPlaceId: string = '';
  deliveryPlaceId: string = '';
  ShippingRateResponse: ShippingRate;


  showSpinner: boolean = false;

  constructor(private fb: FormBuilder,
    private snakebar: MatSnackBar,
    private addressServ: AddressService,
    private logging: LoggingService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.CalForm = this.fb.group({
      pickup: ['', Validators.required],
      delivery: ['', Validators.required],
      weight: ['', [Validators.required, Validators.pattern('[0-9.]*')]]
    });
    this.CalForm.valueChanges.subscribe(data => {
      this.showPrice = false;
    })
  }

  private _filter(value: string): Addresslist[] {
    const filterValue = value.toLowerCase();
    return this.addressList.filter(option => option.formatted_address.toLowerCase().indexOf(filterValue) === 0);
  }

  onchangePickupAddress(event) {

    const keyCode = event.keyCode;
    if (keyCode !== 40 && keyCode !== 38 && keyCode !== 13) {
      const pickupAddr: string = this.CalForm.controls.pickup.value;
      if (pickupAddr && pickupAddr.length > 3) {
        this.addressList$ = this.addressServ.getAddressList(pickupAddr);
      }
    }
  }
  onBlurPickupAddress(event) {
    //console.log(event);
    if (this.pickupPlaceId == '' || this.pickupPlaceId == null) {
      this.CalForm.patchValue({
        pickup: ''
      });
      // this.snakebar.open('Please Select Address From List', 'ok', { dura });
      this.logging.notify('Please Select Address From List');
    }
  }
  onBlurDeliveryAddress(event) {
    if (this.deliveryPlaceId == '' || this.deliveryPlaceId == null) {
      this.CalForm.patchValue({
        delivery: ''
      });
      // this.snakebar.open('Please Select Address From List', 'ok');
      this.logging.notify('Please Select Address From List');
    }
  }

  onchangeDeliveryAddress(event) {

    const keyCode = event.keyCode;
    if (keyCode !== 40 && keyCode !== 38 && keyCode !== 13) {
      const deliveryAddr: string = this.CalForm.controls.delivery.value;
      if (deliveryAddr && deliveryAddr.length > 3) {
        this.addressList$ = this.addressServ.getAddressList(deliveryAddr);
      }
    }
  }

  onSelectPickupOption(event: MatAutocompleteSelectedEvent) {
    this.pickupPlaceId = event.option.id;
    // console.log(event);
  }

  onSelectDeliveryOption(event: MatAutocompleteSelectedEvent) {
    this.deliveryPlaceId = event.option.id;
    // console.log(event);
  }

  validateAddresses(): boolean {
    if (this.pickupPlaceId == this.deliveryPlaceId) {
      return false;
    } else {
      return true;
    }
  }


  onSubmit(form) {
    if (form.valid) {
      this.showPrice = false;
      if (this.validateAddresses()) {
        this.showSpinner = true;
        this.addressServ.GetShippingPrice(form.value.pickup, this.pickupPlaceId,
          form.value.delivery, this.deliveryPlaceId, form.value.weight).subscribe(data => {
            form.resetForm();
            if (data.success) {
              this.ShippingRateResponse = data.data;
              this.logging.log(data);
              this.showPrice = true;
            } else {
              this.logging.notify(data.message);
            }
            this.showSpinner = false;

          }, err => {
            this.logging.log(err);
            this.logging.notify('Error While calculating Rate! Please Try Again');
          })

      } else {
        this.logging.notify('Pickup & Delivery Address Cannot be same');
      }


    } else {
      this.snakebar.open('Invalid Form inputs, Please try again', 'ok');
    }
  }

}
