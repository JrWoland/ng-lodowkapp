import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private user: UserService, private router: Router) { }
  goToPageNotFound() {
    this.router.navigate(['404'], { state: { data: { name: 'for not logged user.' } } })
  }

  isLogged() {
    if (this.user.getLoggedUser()[0] === undefined) {
      this.goToPageNotFound();
      return false
    } else {
      return this.user.getLoggedUser()[0].isLogged;
    }
  }

  userTypeAuth(type: string) {
    let isAnyoneLogged: boolean;

    if (this.user.getItems().value.length === 0) {
      isAnyoneLogged = true;
    } else {
      if (this.user.getLoggedUser()[0] === undefined) {
        this.goToPageNotFound();
        isAnyoneLogged = false;
        return;
      } else if (this.user.getLoggedUser()[0].type === type) {
        isAnyoneLogged = true;
      } else if (this.user.getLoggedUser()[0].type !== type) {
        this.router.navigate(['404'], { state: { data: { name: 'for this user type.' } } })
        isAnyoneLogged = false;
      }
    }
    return isAnyoneLogged;
  }

  isParent() {
    return this.userTypeAuth('PARENT')
  }

  isChild() {
    if (this.user.getItems().value.length === 0) {
      this.goToPageNotFound();
      return false;
    } else {
      return this.userTypeAuth('CHILDREN')
    }
  }
}
