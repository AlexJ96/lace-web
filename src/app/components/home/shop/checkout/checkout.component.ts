import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.css', '../../account/account/account.component.css']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy, OnInit {

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

  orderObject: any = {
    address: {
      id: "",
      account: "",
      numberStreet: "",
      town: "",
      city: "",
      country: "",
      postcode: ""
    }
  };

  addresses: any;
  account: any;
  cart: any;
  discount = 0.00;
  freeDelivery: boolean = false;

  constructor(private cd: ChangeDetectorRef, private accountService: AccountService, private route: Router, private shop: ShopService) { }

  async ngOnInit() {
    this.account = this.accountService.getAccount();
    this.cart = await this.accountService.loadCart();
    if (this.cart.cartItems.length == 0) {
      this.cart = await this.accountService.refreshCartData();
    }

    if (this.cart.cartItems.length == 0) {
      this.route.navigateByUrl('account/shopping-bag');
    }
    this.addresses = await this.accountService.loadAddresses();
    if (this.addresses[0] != undefined) {
      this.orderObject.address.id = this.addresses[0].id;
      this.orderObject.address.account = this.addresses[0].account;
      this.orderObject.address.numberStreet = this.addresses[0].numberStreet;
      this.orderObject.address.town = this.addresses[0].town;
      this.orderObject.address.city = this.addresses[0].city;
      this.orderObject.address.country = this.addresses[0].country;
      this.orderObject.address.postcode = this.addresses[0].postcode;
    }
    this.calculateTotalPrice();
  }

  async removeItem(cartItem) {
    let response = await this.accountService.removeItemFromCart(cartItem);
    if (response == "true") {
      this.cart = await this.accountService.loadCart();
      if (this.cart.cartItems.length == 0) {
        this.cart = await this.accountService.refreshCartData();
        if (this.cart.cartItems.length == 0) {
          this.route.navigateByUrl('account/shopping-bag');
        }
      }
    }
  }

  calculateTotalPrice() {
    let total = 0;
    let postageTotal = this.getPriceForPostage();

    if (this.cart == undefined || this.cart == null)
      return postageTotal.toFixed(2);

    this.cart.cartItems.forEach(element => {
      total += +this.getPriceForItem(element);
    });

    console.log(this.discount);
    this.orderObject.totalPrice = ((total + postageTotal) - this.discount).toFixed(2);
    return (total + postageTotal).toFixed(2);
  }

  getPriceForItem(cartItem) {
    return (cartItem.itemSpec.item.price * cartItem.quantity).toFixed(2);
  }

  getPriceForPostage() {
    if (this.orderObject.postageType == 'uk_standard')
      return 4.50;
    else if (this.orderObject.postageType == 'uk_next_day')
      return 6.25;
    else if (this.orderObject.postageType == 'europe')
      return 15.00;
    else if (this.orderObject.postageType == 'rest_of_world')
      return 20.00;
    else
      return 0.00;
  }

  chooseDeliveryMethod(deliveryType) {
    this.orderObject.deliveryType = deliveryType;
    this.orderObject.postageType = "";
    this.checkoutPoints[0].completed = true;
    this.checkoutPoints[0].current = false;
    this.checkoutPoints[1].current = true;
  }

  confirmAddress() {
    if (this.checkDetails() == false)
      return;
    this.checkoutPoints[1].completed = true;
    this.checkoutPoints[1].current = false;
    this.checkoutPoints[2].current = true;
    if (this.orderObject.deliveryType == 'collect') {
      this.confirmPostage();
    }
  }

  checkDetails() {
    if (this.account.title == undefined || this.account.title == "")
      return false;
    if (this.account.firstName == undefined || this.account.firstName == "")
      return false;
    if (this.account.lastName == undefined || this.account.lastName == "")
      return false;
    if (this.account.phoneNumber == undefined || this.account.firstName == "")
      return false;
    if (this.orderObject.deliveryType == 'collect') {
      return true;
    } else {
      if (this.orderObject.address.numberStreet == undefined || this.orderObject.address.numberStreet == "")
        return false;
      if (this.orderObject.address.town == undefined || this.orderObject.address.town == "")
        return false;
      if (this.orderObject.address.city == undefined || this.orderObject.address.city == "")
        return false;
      if (this.orderObject.address.postcode == undefined || this.orderObject.address.postcode == "")
        return false;
    }
    return true;
  }

  selectPostage(postageType) {
    this.orderObject.postageType = postageType;
  }

  confirmPostage() {
    if (this.orderObject.deliveryType == 'post' && (this.orderObject.postageType == undefined || this.orderObject.postageType == ""))
      return;
    this.checkoutPoints[2].completed = true;
    this.checkoutPoints[2].current = false;
    this.checkoutPoints[3].current = true;

    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  goBackToStage(stage) {
    if (stage == 3 && this.orderObject.deliveryType == 'collect') {
      return;
    }
    let currentStage = this.checkoutPoints.find(c => c.current == true);
    if (currentStage.position <= parseInt(stage))
      return;

    let checkoutPoint = this.checkoutPoints.find(c => c.position == parseInt(stage));
    this.checkoutPoints.forEach(element => {
      element.current = false;
    });
    checkoutPoint.current = true;

    for (let i = 3; i > parseInt(stage) - 1; i--) {
      this.checkoutPoints[i].completed = false;
    }
  }

  ngAfterViewInit() {
    // this.card = elements.create('card');
    // this.card.mount(this.cardInfo.nativeElement);

    // this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    if (this.card != undefined) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async applyDiscount() {
    if (this.orderObject.discountCode == undefined || this.orderObject.discountCode == "")
      return;
    let discount = await this.shop.applyDiscount(this.orderObject.discountCode, this.orderObject.totalPrice);
    if (discount == 9999.99) {
      this.discount = this.getPriceForPostage();
      this.freeDelivery = true;
    } else {
      this.discount = discount;
    }
    this.calculateTotalPrice();
    console.log(this.discount);
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      this.orderObject.account = this.account;
      this.orderObject.paymentToken = token;
      this.orderObject.cart = this.cart;
      let orderComplete = await this.accountService.completeOrder(this.orderObject);
      if (orderComplete == 'true') {
        console.log("Order Complete");
        this.route.navigateByUrl('account/shopping-bag/complete')
      }
    }
  }
}
