import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'top-nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.css']
})
export class NavBarComponent {

    showMenu: boolean = false;
    menu: String = "";

    menuContent = [
        {
            title: 'Clothing',
            menuItems: [
                { label: 'Tops', link: 'www.google.co.uk' },
                { label: 'Blouses', link: 'www.google.co.uk' },
                { label: 'Jumpsuits', link: 'www.google.co.uk' },
                { label: 'Playsuits', link: 'www.google.co.uk' },
                { label: 'Skirts', link: 'www.google.co.uk' },
                { label: 'Shorts', link: 'www.google.co.uk' },
                { label: 'Loungewear', link: 'www.google.co.uk' },
                { label: 'Activewear', link: 'www.google.co.uk' },
                { label: 'Coats', link: 'www.google.co.uk' },
                { label: 'Jackets', link: 'www.google.co.uk' },
                { label: 'Knitwear', link: 'www.google.co.uk' },
                { label: 'Jeans', link: 'www.google.co.uk' },
                { label: 'Trousers', link: 'www.google.co.uk' },
                { label: 'Swimwear', link: 'www.google.co.uk' }
            ]
        },
        {
            title: 'Brands',
            menuItems: [
                { label: 'Forever Unique', link: 'www.google.co.uk' },
                { label: 'Genese London', link: 'www.google.co.uk' },
                { label: 'Kevan Jon', link: 'www.google.co.uk' },
                { label: 'Access', link: 'www.google.co.uk' },
                { label: 'Blake Seven', link: 'www.google.co.uk' },
                { label: 'Comino Couture', link: 'www.google.co.uk' },
                { label: 'Freddy', link: 'www.google.co.uk' },
                { label: 'Guess', link: 'www.google.co.uk' },
                { label: 'Leo & Ugo', link: 'www.google.co.uk' },
                { label: 'Salsa', link: 'www.google.co.uk' },
                { label: 'Passioni', link: 'www.google.co.uk' },
                { label: 'Lindsey Brown', link: 'www.google.co.uk' },
                { label: 'Quay', link: 'www.google.co.uk' },
                { label: 'Silvian Heach', link: 'www.google.co.uk' },
                { label: 'Nadine Merabi', link: 'www.google.co.uk' },
                { label: 'Just Unique', link: 'www.google.co.uk' },
                { label: 'Elisa Cavaletti', link: 'www.google.co.uk' }
            ]
        },
        {
            title: 'Dresses',
            menuItems: [
                { label: 'Maxi Dresses', link: 'www.google.co.uk' },
                { label: 'Occasion Dresses', link: 'www.google.co.uk' },
                { label: 'Prom Dresses', link: 'www.google.co.uk' },
                { label: 'Mini Dresses', link: 'www.google.co.uk' },
                { label: 'Skater Dresses', link: 'www.google.co.uk' },
                { label: 'Sequin Dresses', link: 'www.google.co.uk' },
                { label: 'Day Dresses', link: 'www.google.co.uk' },
                { label: 'Bridesmaid Dresses', link: 'www.google.co.uk' },
                { label: 'Wrap Dresses', link: 'www.google.co.uk' },
                { label: 'Bodycon Dresses', link: 'www.google.co.uk' },
                { label: 'Midi Dresses', link: 'www.google.co.uk' }
            ]
        },
        {
            title: 'Accessories',
            menuItems: [
                { label: 'Bags', link: 'www.google.co.uk' },
                { label: 'Belts', link: 'www.google.co.uk' },
                { label: 'Scarves', link: 'www.google.co.uk' },
                { label: 'Sunglasses', link: 'www.google.co.uk' },
                { label: 'Socks', link: 'www.google.co.uk' }
            ]
        },
        { 
            title: 'Footwear',
            menuItems: [
                { label: 'Trainers', link: 'www.google.co.uk' },
                { label: 'Pumps', link: 'www.google.co.uk' },
                { label: 'Shoes', link: 'www.google.co.uk' },
                { label: 'Boots', link: 'www.google.co.uk' },
                { label: 'Slippers', link: 'www.google.co.uk' }
            ] 
        }
    ];

    constructor(private route: Router) { }

    getMenuContent() {
        console.log(this.menuContent.find(m => m.title == this.menu));
        return this.menuContent.find(m => m.title == this.menu);
    }

    redirect(link) {
        this.route.navigateByUrl(link);
    }

}
