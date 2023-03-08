import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Menu } from 'src/app/core/models/Menu';

//Import Json for Menu
import menu from 'src/assets/config/menu/menu.json'

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  dataMenus: Menu[] = menu;
  currentMenu: Menu = {} as Menu;

  constructor(
    private route: Router
  ){ }

  goToPage(url: string): void{
    this.route.navigateByUrl(url);
  }
}
