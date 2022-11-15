import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private arrUsers: User[];
  private id: string;
  constructor() {
    this.arrUsers = [];
    this.id = UUID.UUID();
    if (localStorage.getItem('Users') === null) {
      localStorage.setItem('Users', JSON.stringify(this.arrUsers))
    };
  }

  getUsers() {
    this.arrUsers = JSON.parse(localStorage.getItem('Users')!)
    return this.arrUsers
  }

  addUsers(pForm: any) {
    const newForm = { id: this.id, ...pForm };
    this.arrUsers.push(newForm);
    localStorage.setItem('Users', JSON.stringify(this.arrUsers));
  }

  deleteUser(pId: string) {
    this.arrUsers = this.arrUsers.filter(user => pId !== user.id)
    localStorage.setItem('Users', JSON.stringify(this.arrUsers));

  }

  updateUser(pForm: User) {
    this.arrUsers = this.arrUsers.map((user): any => pForm.id === user.id ? { ...pForm } : user);
    localStorage.setItem('Users', JSON.stringify(this.arrUsers));
  }
}
