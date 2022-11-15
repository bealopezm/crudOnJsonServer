import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() users!: User[];
  @Output() userEmit: EventEmitter<User> = new EventEmitter();
  @Output() idEmit: EventEmitter<User> = new EventEmitter();

  constructor(
    private usersService: UsersService
  ) { }

  update(pId: any) {
    const user = this.users.find(user => pId === user.id);
    this.userEmit.emit(user);
  }

  delete(pId: any) {
    this.idEmit.emit(pId)
  }


}
