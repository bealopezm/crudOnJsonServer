import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { CountiesService } from '../../services/counties.service';

interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
  callingCode: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  user: User | any;
  users!: User[];
  countries: any[] | any;
  isEdit: boolean = false;
  constructor(
    private usersService: UsersService,
    private countriesService: CountiesService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      confirmPassword: new FormControl('', []),
      mail: new FormControl('', [
        Validators.required
      ]),
      offer: new FormControl('', []),
      country: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
    }, [this.passwordValidator]);
  }


  async ngOnInit(): Promise<void> {
    this.users = this.usersService.getUsers();
    await this.countriesService.allCountries()
      .then(res => this.countries = res)
      .catch(err => console.log(err))
  }

  passwordValidator(form: AbstractControl): any {
    const passwordValue = form.get('password')?.value;
    const confirmPasswordValue = form.get('confirmPassword')?.value;
    if (passwordValue !== confirmPasswordValue) {
      return { passwordValidator: true }
    }
    return null
  }


  onSubmit() {
    const form = this.form.value;
    delete form.confirmPassword;
    if (form.offer === "") {
      form.offer = false
    }
    if (this.user?.id) {
      this.usersService.updateUser(form);
      this.user = {};
      this.isEdit = false
    } else {
      this.usersService.addUsers(form);
    }
    this.form.reset();
    this.users = this.usersService.getUsers();

  }

  onUserEmit($event: any) {
    this.user = $event;
    this.isEdit = true
    this.form = new FormGroup({
      name: new FormControl(this.user?.name, [
        Validators.required
      ]),
      password: new FormControl(this.user?.password, [
        Validators.required
      ]),
      confirmPassword: new FormControl(this.user?.password, []),
      mail: new FormControl(this.user?.mail, [
        Validators.required
      ]),
      offer: new FormControl(this.user?.offer, []),
      country: new FormControl(this.user?.country, [
        Validators.required
      ]),
      city: new FormControl(this.user?.city, [
        Validators.required
      ]),
      id: new FormControl(this.user?.id, [])
    }, [this.passwordValidator]);
  }

  onIdEmit($event: any) {
    this.usersService.deleteUser($event);
    this.users = this.usersService.getUsers();
  }



}
