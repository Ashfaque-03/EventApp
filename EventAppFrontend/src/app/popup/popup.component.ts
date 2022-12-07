import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
  @Input() Ok:any|undefined ="Ok"
  @Input() alertMsg:any|undefined
  @Input() alertMsg2:any|undefined 
  @Input() userCode:any|undefined 
  @Input() cancelOn:any|undefined 
  @Input() alertOn:any|undefined = false
  @Output() okBtn = new EventEmitter()
  @Output() cancelBtn = new EventEmitter()
  constructor(){}

  ngOnInit(): void {
  }

  ok(){
    this.okBtn.emit()
    // var i=1
    // if(i<1)
    // {
    //   this.alertOn=false
    // }
  }
  cancel()
  {
   this.cancelBtn.emit()
  }
}
