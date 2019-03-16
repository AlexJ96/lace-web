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
        { title: 'Sale', 
            menuDetails: [
                { categoryTitle: 'Clothing', 
                    menuItems: [
                        { label: 'Coats  Jackets', link: 'www.google.co.uk' },
                        { label: 'Playsuits & Jumpsuits', link: 'www.google.co.uk' }
                    ]
                },
                { categoryTitle: 'Shoes & Boots', 
                    menuItems: [
                        { label: 'All Shoes & Boots', link: 'www.google.co.uk' },
                        { label: 'Heels', link: 'www.google.co.uk' },
                        { label: 'Sandals', link: 'www.google.co.uk' }
                    ]
                },
                { categoryTitle: 'Bags & Accessories', 
                    menuItems: [
                        { label: 'Bags', link: 'www.google.co.uk' },
                        { label: 'Belts', link: 'www.google.co.uk' },
                        { label: 'Scarves', link: 'www.google.co.uk' }
                    ]
                },
                { categoryTitle: 'Bags & Accessories', 
                    menuItems: [
                        { label: 'Bags', link: 'www.google.co.uk' },
                        { label: 'Belts', link: 'www.google.co.uk' },
                        { label: 'Scarves', link: 'www.google.co.uk' }
                    ]
                }
            ]   
        }
    ];

    constructor(private route: Router) {}

    getMenuContent() {
        console.log(this.menuContent.find(m => m.title == this.menu));
        return this.menuContent.find(m => m.title == this.menu);
    }

    redirect(link) {
        this.route.navigateByUrl(link);
    }

}
