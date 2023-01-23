const mongoose = require('mongoose')


// to connect node and mongodb
mongoose.connect('mongodb://localhost:27017/EVENTAPP', {
    useNewUrlParser: true
})

//model creation.collection

const Ucode = mongoose.model('Ucode', {
    initial_id: Number,
    next_id: Number,
    EventNames: Array
})
const Admin = mongoose.model('Admin', {
    UniqueId: String,
    Name: String,
    MobileNo: Number,
    Email: String,
    DateOfBirth: String,
    Password: String,
    RegisteredTime: Date,
    LogDetails: Array,
    WelcomeBox: String,
    About: String
})
const User = mongoose.model('User', {
    UniqueId: Number,
    Name: String,
    MobileNo: Number,
    Email: String,
    DateOfBirth: Date,
    Password: String,
    RegisteredTime: Date,
    LogDetails: Array,
    WelcomeBox: String,
    About: String
})

const Event = mongoose.model('Event', {
    Status: String,
    UniqueId: Number,
    EventName: String,
    EventDate: String,
    confirm:Boolean
})

const Cart = mongoose.model('Cart', {
    Status: String,
    UniqueId: Number,
    EventName: String,
    EventDate: Date
})

const Message = mongoose.model('Message', {
    UniqueId: String,
    Name: String,
    Message: String,
    Chatpoint: Number
})


module.exports = { Admin, Ucode, User, Event, Cart, Message }