import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/Models/user';
import { ManageDataService } from './manage-data.service';
import * as _ from 'lodash';
import { StoreManager } from '../interfaces/store-manager';
import { find } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService implements StoreManager<User> {

  public users: BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(private mdService: ManageDataService) {
    const data: User[] = mdService.getUsersFromLocalStorage();
    if (data !== null) {
      this.users.next(data);
    }
  }

  public getItems() {
    return this.users;
  }

  public insertItem(user: User) {
    this.users.next([...this.users.getValue(), user]);
    this.synchronizeWithLocalStorage();
  }

  public updateItem(user: User) {
    const newStore = this.users.getValue().filter((element) => {
      return element.id !== user.id;
    });
    this.users.next([...newStore, user]);
    this.synchronizeWithLocalStorage();
  }

  public deleteItem(user: User) {
    const newStore = this.users.getValue().filter((element) => {
      return element.id !== user.id;
    });
    this.users.next([...newStore]);
    this.synchronizeWithLocalStorage();
  }

  private synchronizeWithLocalStorage() {
    _.debounce(() => this.mdService.updateUsersToLocalStorage(this.users.getValue()), 2500)();
  }

  public getItemById(id: string) {
    return this.users.pipe(
      find(users => users === users.filter(element => {
        return element.id === id;
      }))
    );
  }

  public getLoggedUser() {
    return this.users.getValue().filter(user => user.isLogged);
  }
}
