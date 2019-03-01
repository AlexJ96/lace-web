import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.css', '../../account/account/account.component.css']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  checkoutPoints = [
    { position: 1, completed: false, current: true },
    { position: 2, completed: false, current: false },
    { position: 3, completed: false, current: false },
    { position: 4, completed: false, current: false },
  ];
  deliveryType: string = "";

  constructor(private cd: ChangeDetectorRef) { }


  chooseDeliveryMethod(deliveryType) {
    this.deliveryType = deliveryType;
    this.checkoutPoints[0].completed = true;
    this.checkoutPoints[0].current = false;
    this.checkoutPoints[1].current = true;
  }

  confirmAddress() {
    this.checkoutPoints[1].completed = true;
    this.checkoutPoints[1].current = false;
    this.checkoutPoints[2].current = true;
  }

  confirmPostage() {
    this.checkoutPoints[2].completed = true;
    this.checkoutPoints[2].current = false;
    this.checkoutPoints[3].current = true;

    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  goBackToStage(stage) {
    let currentStage = this.checkoutPoints.find(c => c.current == true);
    if (currentStage.position <= parseInt(stage))
      return;

    let checkoutPoint = this.checkoutPoints.find(c => c.position == parseInt(stage));
    this.checkoutPoints.forEach(element => {
      element.current = false;
    });
    checkoutPoint.current = true;

    for (let i = 3; i > parseInt(stage)-1; i--) {
      this.checkoutPoints[i].completed = false;
    }
  }

  ngAfterViewInit() {
    // this.card = elements.create('card');
    // this.card.mount(this.cardInfo.nativeElement);

    // this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
    }
  }
}
