import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const options = {
  headers: new HttpHeaders
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private route: Router, private http: HttpClient) { }

  // admin 

  adminCreate(uname: any, ph: any, email: any, dob: any) {
    const regbody = {
      "uname": uname,
      "ph": ph,
      "email": email,
      "dob": dob
    }
    return this.http.post('http://localhost:3003/admin/register', regbody)
  }


  // sending request to server for "register"

  registerService(uname: any, ph: any, email: any, dob: any, pswd: any) {
    const regbody = {
      "uname": uname,
      "ph": ph,
      "email": email,
      "dob": dob,
      "pswd": pswd
    }
    return this.http.post('http://localhost:3003/register', regbody)
  }

  // sending request to server for "login"

  adminLogin(userid: any, pswd: any) {
    const logbody = {
      userid,
      pswd
    }
    return this.http.post('http://localhost:3003/admin/login', logbody)
  }

  loginService(userid: any, pswd: any) {
    const logbody = {
      userid,
      pswd
    }
    return this.http.post('http://localhost:3003/login', logbody)
  }

  logService(userid: any, user: string) {
    const logsbody = {
      userid
    }
    if (user == "admin") {
      return this.http.post('http://localhost:3003/admin/logDetails', logsbody, this.getHeader())
    }
    else {
      return this.http.post('http://localhost:3003/logDetails', logsbody, this.getHeader())
    }
  }
  // for user details
  userDetails(userid: any, user: string) {
    const userbody = {
      userid
    }
    if (user == "admin") {
      return this.http.post('http://localhost:3003/adminDetails', userbody, this.getHeader())
    }
    else {
      return this.http.post('http://localhost:3003/userDetails', userbody, this.getHeader())
    }
  }

  // event add 
  AdminEventAdd(userid: any, Ename: any, imgToUrl: any) {
    const evtBody = {
      userid, Ename, imgToUrl
    }
    return this.http.post('http://localhost:3003/admin/event/add', evtBody, this.getHeader())
  }

  // event delete 
  AdminEventDel(userid: any, Ename: any) {
    const evtBody = {
      userid, Ename
    }
    return this.http.post('http://localhost:3003/admin/event/delete', evtBody, this.getHeader())
  }
  
  // message feature
  msgService(userid: any, msg: any, user: string) {
    const msgbody = {
      userid,
      msg,
      user
    }
    return this.http.post('http://localhost:3003/message/chatit', msgbody, this.getHeader())
  }
  // message history
  msghistoryService(userid: any, user: string) {
    const msgbody = {
      userid, user
    }
    return this.http.post('http://localhost:3003/message/history', msgbody, this.getHeader())
  }

  // update profile
  updateProfile(userid: any, newName: any, newAbout: any, user: string) {
    const profilebody = {
      userid,
      newName,
      newAbout
    }
    if (user == "admin") {
      return this.http.post('http://localhost:3003/admin/update/Profile', profilebody, this.getHeader())
    }
    else {
      return this.http.post('http://localhost:3003/update/Profile', profilebody, this.getHeader())
    }
  }

  // update password
  updatePswd(userid: any, pswd: any, user: string) {
    const pswdbody = {
      userid,
      pswd
    }
    if (user == "admin") {
      return this.http.post('http://localhost:3003/admin/update/Password', pswdbody, this.getHeader())
    }
    else {
      return this.http.post('http://localhost:3003/update/Password', pswdbody, this.getHeader())
    }
  }

  // sending request to server for "logout"

  logoutService(userid: any, user: string) {
    const logoutbody = {
      userid
    }
    if (user == "admin") {
      return this.http.post('http://localhost:3003/admin/logout', logoutbody, this.getHeader())
    }
    else {
      return this.http.post('http://localhost:3003/logout', logoutbody, this.getHeader())
    }
  }

  eventNamesService(userid: any) {
    const eventnamesbody = {
      userid
    }
    return this.http.post('http://localhost:3003/event', eventnamesbody, this.getHeader())
  }

  eventCart(userid: any, Ename: any, Edate: any) {
    const evtbody = {
      userid,
      Ename,
      Edate
    }
    return this.http.post('http://localhost:3003/event/cart', evtbody, this.getHeader())
  }

  eventdelCart(userid: any, Ename: any, Edate: any) {
    const evtbody = {
      userid,
      Ename,
      Edate
    }
    return this.http.post('http://localhost:3003/event/delcart', evtbody, this.getHeader())
  }

  eventCreation(userid: any, Ename: any, Edate: any) {
    const evtbody = {
      userid,
      Ename,
      Edate
    }
    return this.http.post('http://localhost:3003/event/add', evtbody, this.getHeader())
  }

  eventDeletion(userid: any, Ename: any, Edate: any) {
    const evtbody = {
      userid,
      Ename,
      Edate
    }
    return this.http.post('http://localhost:3003/event/delete', evtbody, this.getHeader())
  }
  eventConfirm(UniqueId: any, Ename: any, Edate: any) {
    var userid = JSON.parse(localStorage.getItem('userId') || '')
    const evtbody = {
      UniqueId,
      Ename,
      Edate,
      userid
    }
    return this.http.post('http://localhost:3003/admin/event/confirm', evtbody, this.getHeader())
  }

  cartHistory(userid: any, user: string) {
    const evtbody = {
      userid
    }
    if (user == "admin") {
      return this.http.post('http://localhost:3003/eventhistory/confirm', evtbody, this.getHeader())
    }
    else {
      return this.http.post('http://localhost:3003/eventhistory/cart', evtbody, this.getHeader())
    }
  }

  addHistory(userid: any, user: string) {
    const evtbody = {
      userid
    }
    if (user == "admin") {
      return this.http.post('http://localhost:3003/admin/eventhistory/add', evtbody, this.getHeader())
    }
    else {
      return this.http.post('http://localhost:3003/eventhistory/add', evtbody, this.getHeader())
    }
  }

  delHistory(userid: any, user: string) {
    const evtbody = {
      userid
    }
    if (user == "admin") {
      return this.http.post('http://localhost:3003/admin/eventhistory/delete', evtbody, this.getHeader())
    }
    else {
      return this.http.post('http://localhost:3003/eventhistory/delete', evtbody, this.getHeader())
    }
  }

  delAcc(userid: any, user: string) {
    if (user == "admin") {
      return this.http.delete(`http://localhost:3003/admin/deleteAccount/${userid}`, this.getHeader())
    }
    else {
      return this.http.delete(`http://localhost:3003/deleteAccount/${userid}`, this.getHeader())
    }
  }

  // for token 
  getHeader() {
    var token = JSON.parse(localStorage.getItem('token') || '')
    var headers = new HttpHeaders()
    if (token) {
      headers = headers.append('x-access-token', token)
    }
    options.headers = headers
    return options
  }
  // end
}
