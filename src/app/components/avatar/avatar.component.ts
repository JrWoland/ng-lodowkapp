import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  avatars = ['eagle', 'badger', 'parrot', 'cat', 'owl']

  constructor() { }

  ngOnInit() {
  }

  private chosenAvatar: string;

  chooseAvatar(avatar: string): void {
    this.chosenAvatar = avatar;
  }

}