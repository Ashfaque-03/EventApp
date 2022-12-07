import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userName:any
  userId:any
  accSettingshow:boolean=false
  @Input() settingShow: any=false
  @Output() options = new EventEmitter()
  @Output() deleteShow = new EventEmitter()
  @Output() addShow = new EventEmitter()
  @Output() delAcc = new EventEmitter()
  // cart
  @Output() carts =new EventEmitter()
  // popup variables
  msg:any
  Ok:any
  logAlert:boolean=false
  cancelBtn:boolean=false

  // logged details
  @Input() logsShow: any
  @Output() logs = new EventEmitter()
  logsArray:any=[]
  RegisteredDetails: any;

  //   profile
  @Output() showprofile =new EventEmitter()
  @Output() secure =new EventEmitter()
  

constructor(private routing: Router, private service:AuthenticateService, private http:HttpClient){

  this.userId=JSON.parse(localStorage.getItem('userId') || '')
  //user data fetching from database
  service.userDetails(JSON.parse(localStorage.getItem('userId') || ''))
  .subscribe((result:any)=>{
    if(result){
      this.userName=result.userName
      console.log(this.userName)
    }
  })
}

  ngOnInit(): void {
    this.service.logService(this.userId)
    .subscribe((result:any)=>{
      if(result){
        this.logsArray=result.LogDetails
        this.RegisteredDetails=result.RegisteredDetails
      }
    })  
  }

  // settings 

  OptClose(){
    this.options.emit()
    this.accSettingshow=false
  }

  settings(){
    if(this.accSettingshow==false){
      this.accSettingshow=true
    }
    else{
      this.accSettingshow=false
    }
  }

  // profile
  showPro(){
    this.showprofile.emit()
  }
  // cart history
  cartShow(){
    this.carts.emit()
    this.settings()

  }
  // loged details
  logdetails(){
    this.logs.emit()
    this.settings()
  }
  security(){
    this.secure.emit()
    this.settings()
  }
  AccDelete(){
    this.delAcc.emit()
    this.settings()
  }
  // delete event history
  deletedShow(){
    this.deleteShow.emit()
    console.log("yes")
  }

  // add event history
  addedShow(){
    this.addShow.emit()
    console.log("yes")
  }

  // logout

  logout(): void{
    this.Ok="Yes"
    this.msg="Are you sure want to Logout ?"
    this.cancelBtn=true
    this.logAlert=true
    this.OptClose()
  }

  logOk(){
    if(localStorage.getItem('userId')){
      this.service.logoutService(this.userId)
      .subscribe((result:any)=>{
        if(result){
          this.Ok="Ok"
          this.msg=result.message
          localStorage.removeItem('userId')
          this.cancelBtn=false
        }
      },(result=>{
        this.msg=result.message
        this.cancelBtn=false
      }))
    }
    else{
      this.logAlert=false
      this.routing.navigateByUrl('')
    }
  }

  logcancel(){
    this.logAlert=false
    this.cancelBtn=false
  }

  
  // settings end

}
