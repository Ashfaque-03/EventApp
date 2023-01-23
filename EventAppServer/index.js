const express =require('express')
const login = require('./login')
const register = require('./register')
const events =require('./event')
const admin =require('./admin')
const eventhistory =require('./eventHistory')
const message =require('./message')
const jwt = require('jsonwebtoken')
const cors= require('cors')

const app= express()
app.use(express.json())

const appMiddleware = (req, res, next)=>{
    console.log("Application Specific Middle")
    next()
}
// using middleware for token verification
app.use(appMiddleware)

app.use(cors({
    origin:'http://localhost:4200'
}))


const jwtMiddleware = ((req,res,next)=>{
    try{
        const token = req.headers["x-access-token"]
        const data = jwt.verify(token,"Eventsuperkeysecret@0367")
        if(req.body.userid==data.currentUserid){
            next()
        }
    }
    catch{
        return{
            statusCode: 403,
            status: false,
            message: "Please Login"
        }
    }
})

app.post('/', (req, res) => {
    res.send("This is  a sample post method")
})
app.post('/admin/register',(req,res)=>{
    admin.adminCreate(req.body.uname,req.body.ph,req.body.email,req.body.dob)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/admin/login',(req,res)=>{
    admin.adminLogin(req.body.userid,req.body.pswd)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/register',(req,res)=>{
    register.registerService(req.body.uname,req.body.ph,req.body.email,req.body.dob,req.body.pswd)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})



app.post('/login',(req,res)=>{
    login.loginService(req.body.userid,req.body.pswd)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/adminDetails', (req,res)=>{
    admin.adminDetails(req.body.userid)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})
app.post('/userDetails', jwtMiddleware, (req,res)=>{
    login.userDetails(req.body.userid)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/admin/logout',  jwtMiddleware, (req,res)=>{
    admin.adminLogout(req.body.userid)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})
app.post('/logout',  jwtMiddleware, (req,res)=>{
    login.logoutService(req.body.userid)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.delete('/admin/deleteAccount/:userid', (req,res)=>{
    admin.deleteAcc(req.params.userid)
    .then(user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})
app.delete('/deleteAccount/:userid', (req,res)=>{
    register.deleteAcc(req.params.userid)
    .then(user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/admin/logDetails', (req,res)=>{
    admin.adminLogDetails(req.body.userid)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})
app.post('/logDetails',  jwtMiddleware, (req,res)=>{
    login.LogDetails(req.body.userid)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/admin/update/Profile',  jwtMiddleware, (req,res)=>{
    admin.changeProfile(req.body.userid,req.body.newName,req.body.newAbout)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})
app.post('/update/Profile',  jwtMiddleware, (req,res)=>{
    register.changeProfile(req.body.userid,req.body.newName,req.body.newAbout)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/admin/update/Password',  jwtMiddleware, (req,res)=>{
    admin.changePswd(req.body.userid,req.body.pswd)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})
app.post('/update/Password',  jwtMiddleware, (req,res)=>{
    register.changePswd(req.body.userid,req.body.pswd)
    .then (user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/event', (req,res)=>{
    events.eventDetails()
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/event/cart',  jwtMiddleware, (req,res)=>{
    events.eventCart(req.body.userid,req.body.Ename,req.body.Edate)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/event/delcart',  jwtMiddleware, (req,res)=>{
    events.eventdelCart(req.body.userid,req.body.Ename,req.body.Edate)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/event/add', jwtMiddleware, (req,res)=>{
    events.eventCreation(req.body.userid,req.body.Ename,req.body.Edate)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/event/delete', jwtMiddleware, (req,res)=>{
    events.eventDeletion(req.body.userid,req.body.Ename,req.body.Edate)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})
app.post('/admin/event/confirm', jwtMiddleware, (req,res)=>{
    admin.eventConfirm(req.body.UniqueId,req.body.Ename,req.body.Edate,req.body.userid)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/eventhistory/cart', jwtMiddleware, (req,res)=>{
    eventhistory.cartHistory(req.body.userid)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/admin/eventhistory/add', jwtMiddleware, (req,res)=>{
    admin.addHistory(req.body.userid)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/admin/eventhistory/delete', jwtMiddleware, (req,res)=>{
    admin.delHistory(req.body.userid)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})
app.post('/admin/event/add', jwtMiddleware, (req,res)=>{
    admin.addEvent(req.body.userid,req.body.Ename,req.body.imgToUrl)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})
app.post('/admin/event/delete', jwtMiddleware, (req,res)=>{
    admin.delEvent(req.body.userid,req.body.Ename)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})
app.post('/eventhistory/add', jwtMiddleware, (req,res)=>{
    eventhistory.addHistory(req.body.userid)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/eventhistory/delete', jwtMiddleware, (req,res)=>{
    eventhistory.delHistory(req.body.userid)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/eventhistory/confirm', jwtMiddleware, (req,res)=>{
    admin.confirmHistory(req.body.userid)
    .then (evt=>{
        if(evt){
            res.status(evt.statusCode).json(evt)
        }
    })
})

app.post('/message/history', jwtMiddleware, (req,res)=>{
    message.messageHistory(req.body.userid,req.body.user)
    .then (msg=>{
        if(msg){
            res.status(msg.statusCode).json(msg)
        }
    })
})

app.post('/message/chatit', jwtMiddleware, (req,res)=>{
    message.messageCreation(req.body.userid,req.body.msg,req.body.user)
    .then (msg=>{
        if(msg){
            res.status(msg.statusCode).json(msg)
        }
    })
})


app.listen(3003,()=>{
    console.log("Server listening to port number 3003")
})
