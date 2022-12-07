import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const options={
  headers:new HttpHeaders
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private route:Router, private http: HttpClient){}


// sending request to server for "register"

  registerService(uname:any,ph:any,email:any,dob:any,pswd:any){
    const regbody={
      "uname":uname,
      "ph":ph,
      "email":email,
      "dob":dob,
      "pswd":pswd
    }
    console.log("vannu")
    return this.http.post('http://localhost:3003/register',regbody)
  }

// sending request to server for "login"

  loginService(userid:any,pswd:any){
    const logbody={
      userid,
      pswd
    }
    return this.http.post('http://localhost:3003/login',logbody)
  }

  logService(userid:any){
    const logsbody={
      userid
    }
    return this.http.post('http://localhost:3003/logDetails',  logsbody, this.getHeader())
  }
// for user details
  userDetails(userid:any){
    const userbody={
      userid
    }
    return this.http.post('http://localhost:3003/userDetails',userbody, this.getHeader())
  }

// message feature
msgService(userid:any,msg:any){
  const msgbody = {
    userid,
    msg
  }
  return this.http.post('http://localhost:3003/message/chatit',msgbody, this.getHeader())
}
// message history
msghistoryService(userid:any){
  const msgbody = {
    userid
  }
  return this.http.post('http://localhost:3003/message/history',msgbody, this.getHeader())
}

// update profile
  updateProfile(userid:any,newName:any,newAbout:any){
    const profilebody ={
      userid,
      newName,
      newAbout
    }
    return this.http.post('http://localhost:3003/update/Profile',  profilebody, this.getHeader())  
  }

// update password
  updatePswd(userid:any,pswd:any){
    const pswdbody ={
      userid,
      pswd
    }
    return this.http.post('http://localhost:3003/update/Password',  pswdbody, this.getHeader())  
  }

// sending request to server for "logout"

logoutService(userid:any){
  const logoutbody={
    userid
  }
  return this.http.post('http://localhost:3003/logout',  logoutbody, this.getHeader())
}

eventNamesService(userid:any){
  const eventnamesbody={
    userid
  }
  return this.http.post('http://localhost:3003/event',  eventnamesbody, this.getHeader())
}

eventCart(userid:any,Ename:any,Edate:any){
  const evtbody={
    userid,
    Ename,
    Edate
  }
  return this.http.post('http://localhost:3003/event/cart',  evtbody, this.getHeader())
}

eventdelCart(userid:any,Ename:any,Edate:any){
  const evtbody={
    userid,
    Ename,
    Edate
  }
  return this.http.post('http://localhost:3003/event/delcart',  evtbody, this.getHeader())
}

eventCreation(userid:any,Ename:any,Edate:any){
  const evtbody={
    userid,
    Ename,
    Edate
  }
  return this.http.post('http://localhost:3003/event/add',  evtbody, this.getHeader())
}

eventDeletion(userid:any,Ename:any,Edate:any){
  const evtbody={
    userid,
    Ename,
    Edate
  }
  return this.http.post('http://localhost:3003/event/delete',  evtbody, this.getHeader())
}

cartHistory(userid:any){
  const evtbody={
    userid
  }
  return this.http.post('http://localhost:3003/eventhistory/cart',  evtbody, this.getHeader())
}

addHistory(userid:any){
  const evtbody={
    userid
  }
  return this.http.post('http://localhost:3003/eventhistory/add',  evtbody, this.getHeader())
}

delHistory(userid:any){
  const evtbody={
    userid
  }
  return this.http.post('http://localhost:3003/eventhistory/delete',  evtbody, this.getHeader())
}

delAcc(userid:any){
  return this.http.delete(  `http://localhost:3003/deleteAccount/${userid}`, this.getHeader())
}

// for token 
getHeader(){
  var token = JSON.parse(localStorage.getItem('token')||'')
  var headers = new HttpHeaders()
  if(token){
    headers=headers.append('x-access-token',token)
  }
  options.headers=headers
  return options
}
// end
}
