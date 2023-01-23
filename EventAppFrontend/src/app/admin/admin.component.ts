import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  userId:any
  pswrd:any
  errormsg:boolean=false
  inpType:string="password"
  visibility:boolean=false
  
  constructor(private route:Router, private fb:FormBuilder, private service:AuthenticateService){
  }
  ngOnInit(): void {
    var uname="Admin" 
    var ph=5657453783
    var email="Admin@gmail.com"
    var  dob="30-04-1997"
    this.service.adminCreate(uname,ph,email,dob)
    .subscribe((result:any)=>{
      if(result){
        // alert("success")
      }
    },(result=>{
      // alert("reject")
    }))
  }
  hideShow(){
    if(this.visibility==false){
      this.visibility=true
      this.inpType="text"
    }
    else{
      this.visibility=false
      this.inpType="password"
    }
   }
   loginCheck(){
    var userid:any=this.userId
    var pswd:any=this.pswrd
    this.service.adminLogin(userid,pswd)
    .subscribe ((result:any)=>{
      if(result){
        // this.onAlert=true
        localStorage.removeItem('userId')
        localStorage.removeItem('welcomeBox')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.setItem("userId",JSON.stringify(result.userId))           
        localStorage.setItem("welcomeBox",JSON.stringify(result.welcomebox)) 
        localStorage.setItem("token",JSON.stringify(result.token))     
        localStorage.setItem("user",JSON.stringify("admin"))     
        this.errormsg=false
        this.route.navigateByUrl('dashboard')
      }
    },(result=>{
      console.log(result.error.message)
      // this.onAlert=false
      // this.regAlert=result.error.message
      this.errormsg=true
    }))
  }

}
