import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  addUserForm: FormGroup;
  updateForm: boolean = this.route.url.includes('update-user');
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userId: number;
  emailFocus:boolean = false;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: Router
  ) {
    if (this.updateForm) {
      try {
        this.loading$.next(true);
        let id: number = Number(this.route.url.split('/')[2]);
        if (Number.isNaN(id)) {
          this.route.navigate(['/users']);
        }
        let sub: Subscription = this.userService
          .getById(id)
          .subscribe((user) => {
            this.userId = id;
            this.createForm(user);
          });
        this.subs.push(sub);
      } catch (e) {
        this.route.navigate(['/users']);
      }
    } else {
      this.createForm();
    }
  }
  subs: Array<Subscription> = [];
  ngOnInit(): void {}

  createForm(user?: User) {
    this.addUserForm = this.fb.group({
      firstName: [user ? user.firstName : '', Validators.required],
      lastName: [user ? user.lastName : '', Validators.required],
      email: new FormControl(user ? user.email : '',[
        
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$"),
      ]),
    });
    this.loading$.next(false);
  }

  postUser() {
    let userToSave: User = this.addUserForm.value;
    if (this.updateForm) {
      userToSave.id = this.userId;
      let sub: Subscription = this.userService
        .updateUser(userToSave)
        .subscribe((resp) => {
          this.route.navigate(['/users']);
        });
      this.subs.push(sub);
    } else {
      let sub: Subscription = this.userService
        .postUser(userToSave)
        .subscribe((resp) => {
          this.route.navigate(['/users']);
        });
      this.subs.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
