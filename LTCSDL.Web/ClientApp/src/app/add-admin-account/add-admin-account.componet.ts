import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-admin-account',
  templateUrl: './add-admin-account.component.html'
})
export class AddAdminAccountComponent implements OnInit {
  public users : any={
    data:[], 
    success: true,
    code: null,
    message: "",
    variant: "success",
    title: "Success"
  }

  public user: any={
    data: [],
    success: true,
    code: null,
    message: "",
    variant: "success",
    title: "Success"
  }
  public isShow:boolean;
  public account:User={
    userId: -1,
    fullName: "",
    userName: "",
    password: "",
    email: "",
    job: "",
    typeUser: -1,
  }
  public list: User[];
  constructor(private _cookieService: CookieService,private http: HttpClient) { 
    var id = this._cookieService.get("userId");
    console.log(id);
    this.http.get(`https://localhost:44381/api/Users/get-all`).subscribe(
      result=>{
        var res : any;
        res = result;
        this.list = res.data;
        console.log(this.list)
      }
    );
  }

  public checkIsShow(id): boolean{
    this.http.get(`https://localhost:44381/api/Users/get-check-type-user/`+id).subscribe(result=>{
        var res : any;
        var list : typeUser;
        res = result;
        list = res;
        console.log(list);
        if(list.typeUser == 0)
          this.isShow = false;
        else
          this.isShow = true;
      })
    return this.isShow;
  }

  ngOnInit() {
  }

}

interface User{
    userId: number,
    fullName: string,
    userName: string,
    password: string,
    email: string,
    job: string,
    typeUser: number
}

interface typeUser{
    typeUser : number
  }