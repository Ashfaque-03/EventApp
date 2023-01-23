import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  editOn:boolean=false
  Iname:boolean=true
  about:boolean=true
  Ipswd:boolean=true
  IpswdC:boolean=true
  Uid:any=JSON.parse(localStorage.getItem('userId') || '')
  user:any=JSON.parse(localStorage.getItem('user') || '')
  Uname:any
  Umobile:any
  Uemail:any
  Udob:any
  aboutField:any
  oldPswd:any
  visibility:boolean=false
  inpType:any="password"
  
  pswdForm = this.fb.group({
    newPswd: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$")]],
    CnewPswd: ['',[Validators.required]],
    curPswd: ['',[Validators.required]]
  })

  // security only showing
  @Input() security: boolean=false
  @ViewChild('widgetsContent')
  widgetsContent!: ElementRef;

  
  @Input() showProfile: boolean|undefined
  @Output() back = new EventEmitter()
  constructor(private service: AuthenticateService,private route:Router, private fb:FormBuilder       ){
    this.Uid=JSON.parse(localStorage.getItem('userId') || '')
    this.user=JSON.parse(localStorage.getItem('user') || '')
    //user data fetching from database
    this.service.userDetails(this.Uid,this.user)
    .subscribe((result:any)=>{
      if(result){
        this.Uname=result.userName
        this.Umobile=result.userPh
        this.Uemail=result.userEmail
        this.Udob=result.userdob
        this.aboutField=result.about
        this.oldPswd=result.pswd
      }
    })
    // end of data fetching

  }

  ngOnInit(): void {
    
  }

  editBtn(){
    this.editOn=true
    this.Iname=false
    this.about=false
    // this.Iemail=false
    // this.Idob=false
    // this.Imobile=false
  }

  saveBtn(){
    this.editOn=false
    this.Iname=true
    this.about=true
    //profile editting
    this.service.updateProfile(this.Uid,this.Uname,this.aboutField,this.user)
    .subscribe((result:any)=>{
      if(result){
        this.Uname=result.newName
        this.aboutField=result.newAbout
        console.log(this.Uname,this.aboutField)
      }
    })
    location.reload()
  }
  hideShow(){
    if(this.visibility==false){
      this.visibility=true
      this.inpType="text"
     //  console.log(this.userId)
     // console.log(this.pswrd)
    }
    else{
      this.visibility=false
      this.inpType="password"
    }
   }

   pswdCheck(){
    this.security==false
    var newPswd =this.pswdForm.value.newPswd  
    var CnewPswd=this.pswdForm.value.CnewPswd
    var curPswd=this.pswdForm.value.curPswd
    console.log("old",this.oldPswd)
    console.log("new",curPswd)
    if(this.oldPswd==curPswd){
      if(this.pswdForm.valid){
        if(newPswd==CnewPswd){  
          this.service.updatePswd(this.Uid,newPswd,this.user)
          .subscribe((result:any)=>{
            if(result){
              alert(result.message)
              localStorage.removeItem('userId')
              this.route.navigateByUrl('')
            }
          })
        }
        else{
          alert("*confirm password must same as new password")
        }
      }
      else{
        alert("*must include a lower case, upper case, number, special and min 8 characters")
      }
    }
    else{
      alert("current password not correct")
    }
    
   }
}
