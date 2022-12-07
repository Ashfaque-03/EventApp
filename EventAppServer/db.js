const mongoose = require('mongoose')


// to connect node and mongodb
mongoose.connect('mongodb://localhost:27017/EVENTAPP',{
    useNewUrlParser:true})

//model creation.collection

const Ucode =mongoose.model('Ucode',{
    initial_id:Number,
    next_id:Number,
    EventNames:Array
})
const User =mongoose.model('User',{
    UniqueId:Number,
    Name:String,  
    MobileNo:Number,
    Email:String,
    DateOfBirth:Date,
    Password:String,
    RegisteredTime:Date,
    LogDetails:Array,
    WelcomeBox:String,
    About:String
})

const Event =mongoose.model('Event',{
    Status:String,
    UniqueId:Number,
    EventName:String,
    EventDate:String
})

const Cart =mongoose.model('Cart',{
    Status:String,
    UniqueId:Number,
    EventName:String,
    EventDate:Date
})

const Message =mongoose.model('Message',{
    UniqueId:Number,
    Name:String,
    Message:String,
    Chatpoint:Number
})


module.exports={Ucode,User,Event,Cart,Message}