import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  userId:any
  pswrd:any
  onAlert:any
  regAlert:any
  loginSignal:any
  registerSignal:any
  uCode:any
  errormsg:boolean=false
  enterinp:boolean=false
  registerForm = this.fb.group({
    uname:["",[Validators.required, Validators.pattern("^[' 'a-zA-Z]*$")]],  
    phno:["",[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10),Validators.maxLength(10)]],
    email:["",[Validators.required, Validators.email]],
    dob:["",[Validators.required]],
    pswd: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$")]],
    pswdC: ['',[Validators.required]]
  })

// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)
  
  passerror:boolean=false 
  visibility:boolean=false
  inpType:any="password"  
  logOn:any=true
  codePopUp:any=true

  constructor(private route:Router, private fb:FormBuilder, private service:AuthenticateService){
    
  }
 
  ngOnInit(): void {
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

  logToReg(){
    this.errormsg=false
    if(this.logOn==false){
      this.logOn=true
    }
    else{
      this.logOn=false
    }
  }

  createLink(){
    this.logToReg()
  }

  loginLink(){
    this.logToReg()
  }

  registerCheck(){
    console.log("clicked")
    var uname =this.registerForm.value.uname
    var ph =this.registerForm.value.phno
    var email =this.registerForm.value.email
    var pswd =this.registerForm.value.pswd  
    var pswdC=this.registerForm.value.pswdC 
    var dob =this.registerForm.value.dob
      console.log(uname)
      console.log(ph)
      console.log(email)
      console.log(pswd)
      console.log(dob)
    if(this.registerForm.valid){
      if(pswd==pswdC){    // for confirm password
        console.log("valid form")
        this.passerror=false
        this.enterinp=false
        this.service.registerService(uname,ph,email,dob,pswd)
        .subscribe ((result:any)=>{
          if(result){
            this.logOn=null
            this.onAlert=true
            this.registerSignal=true
            this.regAlert=result.message
            this.uCode=result.currentId
          }
        },(result=>{
          this.logOn=null
          this.onAlert=true
          this.registerSignal=false
          this.regAlert=result.error.message      
        }))
      }
      // else if(pswd!=pswdC){
      //   this.passerror=true
      // }
      else{
        this.passerror=true
      }
    }
    // else if( uname || ph || email || pswd || pswdC || dob == null ){
    //   this.enterinp=true
    // }
    else{
      this.enterinp=true
    }
  }

  loginCheck(){
    var userid:any=this.userId
    var pswd:any=this.pswrd
    this.service.loginService(userid,pswd)
    .subscribe ((result:any)=>{
      if(result){
        this.logOn=null
        this.onAlert=true
        this.regAlert=result.message
        this.loginSignal=true
        localStorage.removeItem('userId')
        localStorage.removeItem('welcomeBox')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.setItem("userId",JSON.stringify(result.userId))           
        localStorage.setItem("welcomeBox",JSON.stringify(result.welcomebox)) 
        localStorage.setItem("token",JSON.stringify(result.token))   
        localStorage.setItem("user",JSON.stringify("customer"))     
  
        this.errormsg=false
      }
    },(result=>{
      console.log(result.error.message)
      this.logOn=true
      this.onAlert=false
      // this.regAlert=result.error.message
      this.loginSignal=false
      this.errormsg=true
    }))
  }

  popupalert(){
    this.uCode=null
    this.onAlert=false

    if(this.loginSignal==true){
      this.route.navigateByUrl('dashboard')
      this.logOn=true
    }
    else if(this.loginSignal==false){
      this.logOn=true
    }
    else if(this.registerSignal==false){
      this.logOn=false
    }
    else if(this.registerSignal==true){
      this.logOn=true
    }
    this.loginSignal=null
    this.registerSignal=null
  }
}
