import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'util-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {

  silga: string = ''

  constructor(
    private userService: UserService
  ){ }

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.silga = `${user.name[0]}${user.surname[0]}`.toLocaleUpperCase();
  }
}
