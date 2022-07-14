import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationUser } from '../models/pagination-user.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  APIPATH:string = "/user";
  URLAPI: string = environment.host + environment.api + this.APIPATH;

  constructor(private http:HttpClient) { }


  getAllUsers(page:number = 0,size:number=5):Observable<PaginationUser>{
    return this.http.get<PaginationUser>(`${this.URLAPI}/${page}/${size}`);
  }

  getById(id:number):Observable<User>{
    return this.http.get<User>(`${this.URLAPI}/${id}`);
  }


  getAllOrderByIdAsc():Observable<Array<User>>{
    return this.http.get<Array<User>>(`${this.URLAPI}/asc`);
  }

  postUser(user:User):Observable<User>{
    return this.http.post<User>(this.URLAPI,user);
  }

  updateUser(user:User):Observable<User>{
    return this.http.put<User>(this.URLAPI,user);
  }

  delete(id:number):Observable<User>{
    return this.http.delete<User>(`${this.URLAPI}/${id}`);
  }
}
