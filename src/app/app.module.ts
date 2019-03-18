import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routing } from './routing';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/home/landing-page/landing-page.component';
import { NavBarComponent } from './components/home/reusable/nav-bar/nav-bar.component';
import { NewsletterComponent } from './components/home/reusable/newsletter/newsletter.component';
import { FooterComponent } from './components/home/reusable/footer/footer.component';
import { GalleryComponent } from './components/home/reusable/gallery/gallery.component';
import { CredentialsComponent } from './components/home/account/credentials/credentials.component';
import { HomeComponent } from './components/home/home/home.component';
import { AccountComponent } from './components/home/account/account/account.component';
import { ForgottenPasswordComponent } from './components/home/account/forgotten-password/forgotten-password.component';

import { ApiService } from './services/api.service';
import { BlockerService } from './services/blocker.service';
import { AccountMenuComponent } from './components/home/account/account-menu/account-menu.component';
import { MyDetailsComponent } from './components/home/account/account/my-details/my-details.component';
import { AddressBookComponent } from './components/home/account/account/address-book/address-book.component';
import { ContactPreferencesComponent } from './components/home/account/account/contact-preferences/contact-preferences.component';
import { OrdersComponent } from './components/home/account/account/orders/orders.component';
import { WishlistComponent } from './components/home/account/account/wishlist/wishlist.component';
import { ShoppingBagComponent } from './components/home/account/account/shopping-bag/shopping-bag.component';
import { ShopComponent } from './components/home/shop/shop-overview/shop/shop.component';
import { ShopFilterMenuComponent } from './components/home/shop/shop-overview/shop/shop-filter-menu/shop-filter-menu.component';
import { ShopItemComponent } from './components/home/shop/shop-overview/shop/shop-item/shop-item.component';
import { CheckoutComponent } from './components/home/shop/checkout/checkout.component';
import { AccountService } from './services/account.service';
import { UtilService } from './services/util.service';
import { ShopService } from './services/shop.service';
import { CompleteComponent } from './components/home/shop/checkout/complete/complete.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavBarComponent,
    NewsletterComponent,
    FooterComponent,
    GalleryComponent,
    CredentialsComponent,
    HomeComponent,
    AccountComponent,
    ForgottenPasswordComponent,
    AccountMenuComponent,
    MyDetailsComponent,
    AddressBookComponent,
    ContactPreferencesComponent,
    OrdersComponent,
    WishlistComponent,
    ShoppingBagComponent,
    ShopComponent,
    ShopFilterMenuComponent,
    ShopItemComponent,
    CheckoutComponent,
    CompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routing,
      { enableTracing: false },
    )
  ],
  exports: [RouterModule],
  providers: [ApiService, BlockerService, AccountService, UtilService, ShopService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
