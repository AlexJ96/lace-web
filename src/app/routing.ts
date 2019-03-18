import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/home/landing-page/landing-page.component';
import { AccountComponent } from './components/home/account/account/account.component';
import { HomeComponent } from './components/home/home/home.component';
import { CredentialsComponent } from './components/home/account/credentials/credentials.component';
import { ForgottenPasswordComponent } from './components/home/account/forgotten-password/forgotten-password.component';
import { MyDetailsComponent } from './components/home/account/account/my-details/my-details.component';
import { AddressBookComponent } from './components/home/account/account/address-book/address-book.component';
import { ContactPreferencesComponent } from './components/home/account/account/contact-preferences/contact-preferences.component';
import { OrdersComponent } from './components/home/account/account/orders/orders.component';
import { WishlistComponent } from './components/home/account/account/wishlist/wishlist.component';
import { ShoppingBagComponent } from './components/home/account/account/shopping-bag/shopping-bag.component';
import { ShopComponent } from './components/home/shop/shop-overview/shop/shop.component';
import { ShopItemComponent } from './components/home/shop/shop-overview/shop/shop-item/shop-item.component';
import { CheckoutComponent } from './components/home/shop/checkout/checkout.component';
import { CompleteComponent } from './components/home/shop/checkout/complete/complete.component';

export const routing: Routes = [
    {
        path: '', component: LandingPageComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'account', component: AccountComponent },
            { path: 'account/my-details', component: MyDetailsComponent },
            { path: 'account/address-book', component: AddressBookComponent },
            { path: 'account/contact-preferences', component: ContactPreferencesComponent },
            { path: 'account/my-orders', component: OrdersComponent },
            { path: 'account/my-account', component: CredentialsComponent },
            { path: 'account/my-account/forgotten', component: ForgottenPasswordComponent },
            { path: 'account/wishlist', component: WishlistComponent },
            { path: 'account/shopping-bag', component: ShoppingBagComponent },
            { path: 'account/shopping-bag/checkout', component: CheckoutComponent },
            { path: 'account/shopping-bag/complete', component: CompleteComponent },
            { path: 'shop', component: ShopComponent },
            { path: 'shop/product/:id', component: ShopItemComponent }
        ]
    },
]
