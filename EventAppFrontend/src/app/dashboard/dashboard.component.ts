import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: any
  userId: any
  user: string = ""
  welcomeBox: boolean = true
  eventaddBtn: boolean = false
  addBtn: boolean = true
  showlog: boolean = false
  settingShow: boolean = false
  prevBtn: boolean = false
  Econfirm: boolean = false
  addEname: boolean = false
  addEdate: boolean = false

  // event history
  eventcartArray: any = []
  eventaddArray: any = []
  eventdelArray: any = []
  eventaddShow: boolean = false
  eventdelShow: boolean = false
  eventcartShow: boolean = false
  tocarthistory: boolean = false

  // event add
  eventName: any
  imgToUrl: any
  // homepage entrypage
  home: boolean = true

  // alert popup
  alertOn: boolean = false
  cancelOn: boolean = false
  alertMsg: any
  alertMsg2: any
  ok: any
  okbtnSignl: any

  // event names fetching
  eventNamesArray: any = []

  // event add variables
  monthOn: boolean = false
  dayOn: boolean = false
  yearOn: boolean = false
  Ename: any
  Emonth: any
  Eday: any
  Eyear: any
  Edate: any
  day29: boolean = false
  day30: boolean = false
  day31: boolean = false
  leapyear: boolean = true

  // delete
  nameEvt: any
  dateEvt: any

  // profile
  showProfile: boolean = false
  securityON: boolean = false

  // msg features
  msg: any = ""
  msgArray: any = []
  msgMinimize: boolean = true
  msgOn: boolean = true

  // // validation
  //   dateform = this.fb.group({
  //   Edate:["",[Validators.required]]
  // })

  // @ViewChild('widgetsContent')
  // widgetsContent!: ElementRef;

  // @ViewChild('iconcolor')
  // iconcolor!: ElementRef;

  constructor(private routing: Router, private service: AuthenticateService, private fb: FormBuilder) {
    // no backing after logout
    if (!(localStorage.getItem('userId'))) {
      alert("please login again")
      this.routing.navigateByUrl('')
    }
    else {
      this.userId = JSON.parse(localStorage.getItem('userId') || '')
      this.user = JSON.parse(localStorage.getItem('user') || '')
      //user data fetching from database
      this.service.userDetails(this.userId, this.user)
        .subscribe((result: any) => {
          if (result) {
            this.userName = result.userName
          }
        })

      // no welcomebox after get started
      var userWelcome = JSON.parse(localStorage.getItem('welcomeBox') || '')
      if (userWelcome == "Off") {
        this.welcomeBox = false
      }
    }

    //  ADD HISTORY
    this.service.addHistory(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          // alert(result.message)
          this.eventaddArray = result.history
          if (this.user == "admin") {
            this.eventaddArray.filter((array: any) => { return array.confirm == false })
            // this.eventaddArray.sort((a:any,b:any)=>{return b._id.$oid - a._id.$oid})
          }
        }
      })

    // DELETE HISTORY
    this.service.delHistory(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          this.eventdelArray = result.history
        }
      })
    // event names fetching from database
    this.fetchEvtNames()

    //  cart HISTORY
    this.service.cartHistory(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          // alert(result.message)
          this.eventcartArray = result.history
        }
      })

    // msg history
    this.messageHistory()


  }


  ngOnInit(): void {

    if (this.user == "customer") {




    }

  }


  welcomeUser() {
    this.welcomeBox = false
    this.service.userDetails(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          localStorage.setItem("welcomeBox", JSON.stringify(result.welcomebox))
        }
      })
  }

  // dashboard body function

  addBtnClicked() {
    this.eventcartShow = false
    this.eventaddShow = false
    this.eventdelShow = false
    this.settingShow = false
    this.showProfile = false
    this.Econfirm = false
    this.showlog = false
    this.monthOn = false
    this.prevBtn = true
    this.yearOn = false
    this.dayOn = false
    this.home = false
    if (this.addBtn == false) {
      this.addBtn = true
      this.addEname = false
      this.prevBtn = false
      this.home = true
    }
    else {
      this.addBtn = false
      this.addEname = true
    }
  }

  settingsOptions() {
    if (this.welcomeBox == false) {
      if (this.settingShow == false) {
        this.settingShow = true
        this.msgOn = false
      }
      else {
        this.settingShow = false
        this.msgOn = true
      }
    }
  }

  LoggedDetails() {
    this.closeall()
    this.settingShow = false
    this.showlog = true
    this.prevBtn = true

  }

  closeall() {
    if (this.addBtn == false) {
      this.addBtn = true
      this.addEname = false
      this.Econfirm = false
      this.monthOn = false
      this.dayOn = false
      this.yearOn = false
      this.prevBtn = false
    }
    this.eventcartShow = false
    this.eventaddShow = false
    this.eventdelShow = false
    this.showProfile = false
    this.showlog = false
    this.settingShow = false
    this.alertOn = false
    this.home = false
    this.msgOn = true
  }
  // scrollLeft(){
  //   this.widgetsContent.nativeElement.scrollLeft -= 300;
  // }

  // scrollRight(){
  //   this.widgetsContent.nativeElement.scrollLeft += 300;
  // }

  prev() {
    this.prevBtn = true
    if (this.addEname == true) {         //  for name selection
      this.addBtnClicked()
    }
    else if (this.monthOn == true) {
      this.monthOn = false           // for month selection
      this.addEname = true
    }
    else if (this.dayOn == true)          // for day selection
    {
      this.dayOn = false
      this.monthOn = true
    }
    else if (this.yearOn == true)          // for year selection
    {
      this.yearOn = false
      this.dayOn = true
    }
    else if (this.Econfirm == true)          // for confirm selection
    {
      this.Econfirm = false
      this.yearOn = true
    }
    else if (this.eventaddShow == true) {
      this.eventaddShow = false
      this.prevBtn = false
      this.home = true
    }
    else if (this.eventdelShow == true) {
      this.eventdelShow = false
      this.prevBtn = false
      this.home = true
    }
    else if (this.showlog == true) {
      this.showlog = false
      this.prevBtn = false
      this.home = true
    }
    else if (this.showProfile == true) {
      this.showProfile = false
      this.prevBtn = false
      this.home = true
    }
    else if (this.eventcartShow = true) {
      this.eventcartShow = false
      this.prevBtn = false
      this.home = true
    }
  }
  fetchEvtNames() {
    this.service.eventNamesService(this.userId)
      .subscribe((result: any) => {
        if (result) {
          this.eventNamesArray = result.eventNames
        }
      })
  }

  newEvent() {
    if (this.eventName && this.imgToUrl && this.user == "admin") {
      this.service.AdminEventAdd(this.userId, this.eventName, this.imgToUrl)
        .subscribe((result: any) => {
          alert(result.message)
          this.imgToUrl = ""
          this.eventName = ""
          this.fetchEvtNames()
        }, (result => {
          alert(result.error.message)
        }))
    }
    else {
      alert("please fill all field")
    }
  }

  deleteEvent(){
    this.service.AdminEventDel(this.userId, this.eventName)
    .subscribe((result: any) => {
      this.cancelOn = false
      this.alertMsg=result.message
      this.okbtnSignl="back"
      this.ok = "Ok"
      this.fetchEvtNames()
    }, (result => {
      this.cancelOn = false
      this.alertMsg=result.error.message
      this.okbtnSignl="back"
      this.ok = "Ok"
      this.fetchEvtNames()
    })) 
  }

  selectEname(eventname: any) {
    if (this.user != "admin") {
      this.Ename = eventname
      this.addEname = false
      this.monthOn = true
      // this.prevBtn=true
    }
    else {
      this.alertOn = true
      this.eventName=eventname
      this.cancelOn = true
      this.ok = "Delete"
      this.alertMsg = `Event name : ${eventname}`
      this.okbtnSignl="deleteEvent"
    }
  }

  selectMonth(month: String) {
    this.Emonth = month
    this.daySelector()
    this.dayOn = true
    this.monthOn = false
  }
  daySelector() {
    if (this.Emonth == "January") {
      this.day29 = true
      this.day30 = true
      this.day31 = true
    }
    else if (this.Emonth == "March") {
      this.day29 = true
      this.day30 = true
      this.day31 = true
    }
    else if (this.Emonth == "May") {
      this.day29 = true
      this.day30 = true
      this.day31 = true
    }
    else if (this.Emonth == "July") {
      this.day29 = true
      this.day30 = true
      this.day31 = true
    }
    else if (this.Emonth == "August") {
      this.day29 = true
      this.day30 = true
      this.day31 = true
    }
    else if (this.Emonth == "October") {
      this.day29 = true
      this.day30 = true
      this.day31 = true
    }
    else if (this.Emonth == "December") {
      this.day29 = true
      this.day30 = true
      this.day31 = true
    }
    else if (this.Emonth == "April") {
      this.day29 = true
      this.day30 = true
      this.day31 = false
    }
    else if (this.Emonth == "June") {
      this.day29 = true
      this.day30 = true
      this.day31 = false
    }
    else if (this.Emonth == "September") {
      this.day29 = true
      this.day30 = true
      this.day31 = false
    }
    else if (this.Emonth == "November") {
      this.day29 = true
      this.day30 = true
      this.day31 = false
    }

    else {
      this.day31 = false
      this.day30 = false
    }

  }
  selectDay(day: any) {
    this.Eday = day
    this.yearSelector()
    this.dayOn = false
    this.yearOn = true
  }
  yearSelector() {
    if (this.Emonth == "February") {
      if (this.Eday == 29) {
        this.leapyear = false
      }
      else {
        this.leapyear = true
      }
    }
    else {
      this.leapyear = true
    }
  }
  selectYear(year: any) {
    this.Eyear = year
    this.Edate = this.Eday + "/" + this.Emonth + "/" + this.Eyear
    this.yearOn = false
    this.Econfirm = true
    console.log(this.Edate)
  }

  confirmEvent() {
    this.Econfirm = false
    this.prevBtn = false
    var Ename = this.Ename
    var Edate = this.Edate
    var userid = this.userId
    //popup
    this.cancelOn = false
    this.ok = "Ok"
    // event creation
    this.service.eventCreation(userid, Ename, Edate)
      .subscribe((result: any) => {
        if (result) {
          this.alertMsg = result.message
          this.okbtnSignl = "addEvent"
          this.alertOn = true
          this.addBtn = true
        }
      }, (result => {
        this.alertMsg = result.error.message
        this.okbtnSignl = "noEvent"
        this.alertOn = true
      }))
  }
  eventaddHistory() {
    this.closeall()
    this.prevBtn = true
    this.settingShow = false
    this.eventaddShow = true
    this.service.addHistory(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          // alert(result.message)
          this.eventaddArray = result.history
          if (this.user == "admin") {
            this.eventaddArray = this.eventaddArray.filter((array: any) => { return array.confirm == false })
            // this.eventaddArray.sort((a:any,b:any)=>{return b._id.$oid - a._id.$oid})
          }
        }
      })
  }

  eventcartHistory() {
    this.closeall()
    this.prevBtn = true
    this.settingShow = false
    this.eventcartShow = true
    this.service.cartHistory(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          this.eventcartArray = result.history
        }
      })
  }

  toCart() {
    this.Econfirm = false
    this.prevBtn = false
    // console.log("confirm",this.dateform.value.Edate)
    var Ename = this.Ename
    var Edate = this.Edate
    console.log(Edate)
    var userid = this.userId
    //popup
    this.cancelOn = false
    this.ok = "Ok"
    // event creation
    this.service.eventCart(userid, Ename, Edate)
      .subscribe((result: any) => {
        if (result) {
          this.alertMsg = result.message
          this.okbtnSignl = "addCart"
          this.alertOn = true
          this.addBtn = true
        }
      }, (result => {
        this.alertMsg = result.error.message
        this.okbtnSignl = "noEvent"
        this.alertOn = true
      }))

  }

  eventadd(Ename: any, Edate: any) {
    this.Ename = Ename
    this.nameEvt = Ename
    this.Edate = Edate
    this.dateEvt = Edate
    this.alertMsg = `Event name : ${Ename}`
    this.alertMsg2 = Edate
    this.ok = "Add"
    this.cancelOn = true
    this.alertOn = true
    this.okbtnSignl = "cartAddevent"
  }

  del(EventName: any, EventDate: any) {
    this.alertOn = true
    this.ok = "Delete"
    this.alertMsg = `Event name : ${EventName}`
    this.alertMsg2 = EventDate
    this.cancelOn = true
    this.nameEvt = EventName
    this.dateEvt = EventDate
    this.okbtnSignl = "delHistory"
  }

  confirmOrder(UniqueId: any, EventName: any, EventDate: any) {
    console.log(UniqueId, EventName, EventDate)
    this.service.eventConfirm(UniqueId, EventName, EventDate)
      .subscribe((result: any) => {
        if (result) {
          console.log("order confirmed")
          console.log(result.message)
          this.eventaddHistory()
        }
      }, (result => {
        console.log("order not confirmed")
      }))
  }
  cancelOrder(userid: any, EventName: any, EventDate: any) {

  }

  delcart(EventName: any, EventDate: any) {
    this.alertOn = true
    this.ok = "Delete"
    this.alertMsg = `Event name : ${EventName}`
    this.alertMsg2 = EventDate
    this.cancelOn = true
    this.nameEvt = EventName
    this.dateEvt = EventDate
    console.log(this.dateEvt)
    this.okbtnSignl = "delcart"
  }

  okBtn() {
    if(this.okbtnSignl=="back"){
      this.alertOn=false
    }
    if(this.okbtnSignl == "deleteEvent"){
      this.deleteEvent()
    }
    if (this.okbtnSignl == "delHistory") {
      this.delLogConfirm()
    }
    if (this.okbtnSignl == "delcart") {
      this.delcartconfirm()
    }
    if (this.okbtnSignl == "delAcc") {
      this.delAccConfirm()
    }
    if (this.okbtnSignl == "delmsg") {
      this.eventdelHistory()
    }
    if (this.okbtnSignl == "addEvent") {
      this.eventaddHistory()
    }
    if (this.okbtnSignl == "addCart") {
      this.eventcartHistory()
    }
    if (this.okbtnSignl == "cartAddevent") {
      this.ok = "ok"
      this.delcartconfirm()
      this.tocarthistory = true
      this.confirmEvent()
    }
    if (this.okbtnSignl == "noEvent") {
      this.alertOn = false
      if (this.tocarthistory == false) {
        this.Econfirm = false
        this.addEname = true
      }
      else {
        this.tocarthistory = false
        this.eventcartHistory()
      }
    }
    this.okbtnSignl = null
  }

  delLogConfirm() {
    this.service.eventDeletion(this.userId, this.nameEvt, this.dateEvt)
      .subscribe((result: any) => {
        if (result) {
          this.cancelOn = false
          this.ok = "Ok"
          this.okbtnSignl = "delmsg"
          this.alertMsg = result.message
          this.alertMsg2 = ""
        }
      })
  }

  delcartconfirm() {
    this.service.eventdelCart(this.userId, this.nameEvt, this.dateEvt)
      .subscribe((result: any) => {
        if (result) {
          this.cancelOn = false
          this.ok = "Ok"
          this.okbtnSignl = "addCart"
          this.alertMsg = result.message
          this.alertMsg2 = ""
        }
      })
  }

  cancelBtn() {
    this.alertOn = false
    this.cancelOn = false
    this.ok = "Ok"
    this.alertMsg = ""
    this.alertMsg2 = ""
    this.eventName=""
  }

  eventdelHistory() {
    this.closeall()
    this.prevBtn = true
    this.eventdelShow = true
    this.service.delHistory(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          this.eventdelArray = result.history
          console.log(this.eventdelArray)
        }
      })
  }

  // mouseEntertable(){
  //   if(this.iconcolor.nativeElement.style.color == 'black'){
  //     this.iconcolor.nativeElement.style.color = 'grey'
  //   }
  //   else{
  //     this.iconcolor.nativeElement.style.color = 'black'

  //   }
  // }

  deleteAcc() {
    this.alertOn = true
    this.cancelOn = true
    this.ok = "Confirm"
    this.okbtnSignl = "delAcc"
    this.alertMsg = "Confirm for deletion"

  }

  delAccConfirm() {
    console.log("ippo,", this.userId)
    this.service.delAcc(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          console.log("ok,", result)
          this.ok = "Ok"
          this.alertMsg = result.message
          this.routing.navigateByUrl('')
          this.alertMsg = ""
          this.alertMsg2 = ""
        }
      })
  }

  // profile
  showPro() {
    this.closeall()
    this.securityON = false
    this.showProfile = true
    this.settingShow = false
    this.prevBtn = true
  }

  security() {
    this.closeall()
    this.securityON = true
    this.showProfile = true
    this.settingShow = false
    this.prevBtn = true
  }

  // message features
  messageSend() {
    if (this.msg) {
      this.service.msgService(this.userId, this.msg, this.user)
        .subscribe((result: any) => {
          if (result) {
            console.log(result.message)
            this.messageHistory()
            this.msg = ""
          }
        })
    }
  }

  messageHistory() {
    this.service.msghistoryService(this.userId, this.user)
      .subscribe((result: any) => {
        if (result) {
          console.log(result.message)
          this.msgArray = result.messagedetails
        }
      })
  }

  mini() {
    this.msgMinimize = true
  }

  max() {
    this.msgMinimize = false
  }

}
