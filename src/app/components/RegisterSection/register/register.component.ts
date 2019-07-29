import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/Models/user';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuid } from 'uuid';
import { fadeIn, ShowOpacity } from 'src/app/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', './../registerinput/registerinput.component.scss'],
  animations: [fadeIn, ShowOpacity]
})
export class RegisterComponent implements OnInit {

  public registerStep: number = 0;
  btnIsDisabled: boolean = true;

  // tu zbiera dane
  private userNamee = '';
  private userColor: string;
  private userAvatar: string;
  private userPIN1 = '';
  private userPIN2 = '';
  private personType;
  private btnSwitch: number[] = [0];

  btnPrevText = 'Back';
  btnNextText = 'Next';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() { }

  setButtonStatus(step: number) {
    switch (step) {
      case -1:
        this.router.navigate(['/start']);
        break;
      case 0:
        this.personType !== undefined ? this.btnIsDisabled = false : this.btnIsDisabled = true;
        break;
      case 1:
        this.userNamee.length !== 0 ? this.btnIsDisabled = false : this.btnIsDisabled = true;
        break;
      case 2:
        this.userAvatar !== undefined ? this.btnIsDisabled = false : this.btnIsDisabled = true;
        break;
      case 3:
        this.userColor !== undefined ? this.btnIsDisabled = false : this.btnIsDisabled = true;
        break;
      case 4:
        if ((this.userPIN1 === this.userPIN2) && (this.userPIN1.length === 4)) {
          this.btnIsDisabled = false;
          this.btnNextText = 'Confirm and add family member';
        } else {
          this.btnIsDisabled = true;
          this.btnNextText = 'PIN codes are not equal';
        }
        break;
      case 5:
        let agregatedInfo = {
          id: uuid(),
          type: this.personType,
          name: this.userNamee,
          avatar: this.userAvatar,
          color: this.userColor,
          pin: this.userPIN1,
          isLogged: false
        };
        this.registerInfo(agregatedInfo);
        this.router.navigate(['/start'])
        break;
    }
  }

  activateBtn() {
    this.btnIsDisabled = false;
    this.btnSwitch.push(this.registerStep);
  }

  validate(event) {
    let input = event.target.value;
    let regex = /[a-zA-Z]/;
    if (input.charAt(input.length - 1).match(regex)) {
      event.target.value = input.slice(0, input.length - 1);
    } else {
      this.setButtonStatus(4);
    }
  }

  onClickPrev() {
    this.registerStep--;
    this.btnNextText = 'Next';
    this.setButtonStatus(this.registerStep);
  }

  onClickNext() {
    this.registerStep++;
    this.setButtonStatus(this.registerStep);
  }

  getUserType(userType: string) {
    this.personType = userType;
    this.setButtonStatus(this.registerStep);
  }

  getName(user: string) {
    if (user.length > 0) {
      this.activateBtn();
      this.userNamee = user;
    } else if (user.length === 0) {
      this.userNamee = '';
      this.setButtonStatus(this.registerStep);
    }
  }

  getColor(color: string) {
    this.userColor = color;
    this.activateBtn();
  }

  getAvatar(avatar: string) {
    this.userAvatar = avatar;
    this.activateBtn();
  }

  registerInfo(userInfo: User) {
    this.userService.insertItem(userInfo); //push user to store and  out to /start path
  }
}
