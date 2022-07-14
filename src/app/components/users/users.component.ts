import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject, Subscription, switchMap } from 'rxjs';
import { PaginationUser } from 'src/app/models/pagination-user.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  paginationUser$:Subject<PaginationUser> = new Subject();
  subs:Array<Subscription> = [];
  pageSize:number = 5;
  currentPage:number = 0;
  ngOnInit(): void {
    let sub:Subscription =
     this.userService.getAllUsers().subscribe(users => this.paginationUser$.next(users));
     this.subs.push(sub);
  }


  changePage(page:number){
    this.currentPage = page;
    let sub:Subscription =
     this.userService.getAllUsers(page,this.pageSize).subscribe(users => this.paginationUser$.next(users));
     this.subs.push(sub);
  }

  deleteUser(user:User){
    let sub:Subscription = this.userService.delete(user.id).pipe(
      switchMap(_ => this.userService.getAllUsers(this.currentPage,this.pageSize)))
      .subscribe(users => {
        if(users.totalPages<=this.currentPage){
          this.changePage(users.totalPages-1);
        }else{
          this.paginationUser$.next(users)
        }
      });
    this.subs.push(sub);
  }

  goUserForm(idUser:number = -1){
    if(idUser>-1){
      this.router.navigate(['update-user',idUser]);
    }else{
      this.router.navigate(['add-user']);
    }
  }

  changePageSize(pageSize:any){
    this.pageSize = pageSize;
    let sub:Subscription =
     this.userService.getAllUsers(0,pageSize).subscribe(users => this.paginationUser$.next(users));
     this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
