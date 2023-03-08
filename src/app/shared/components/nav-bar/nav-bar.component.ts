import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  //Request for parent to know if user is logged in
  @Input() userLoged = false;
  @Output() logout = new EventEmitter<any>();

  emitLogout(): void{
    this.logout.emit()
  }
}
