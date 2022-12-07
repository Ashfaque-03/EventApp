const express =require('express')
const login = require('./login')
const register = require('./register')
const events =require('./event')
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

app.post('/userDetails', jwtMiddleware, (req,res)=>{
    login.userDetails(req.body.userid)
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

app.delete('/deleteAccount/:userid',  jwtMiddleware, (req,res)=>{
    register.deleteAcc(req.params.userid)
    .then(user=>{
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

app.post('/update/Profile',  jwtMiddleware, (req,res)=>{
    register.changeProfile(req.body.userid,req.body.newName,req.body.newAbout)
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

app.post('/event',  jwtMiddleware, (req,res)=>{
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

app.post('/eventhistory/cart', jwtMiddleware, (req,res)=>{
    eventhistory.cartHistory(req.body.userid)
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

app.post('/message/history', jwtMiddleware, (req,res)=>{
    message.messageHistory(req.body.userid)
    .then (msg=>{
        if(msg){
            res.status(msg.statusCode).json(msg)
        }
    })
})

app.post('/message/chatit', jwtMiddleware, (req,res)=>{
    message.messageCreation(req.body.userid,req.body.msg)
    .then (msg=>{
        if(msg){
            res.status(msg.statusCode).json(msg)
        }
    })
})


app.listen(3003,()=>{
    console.log("Server listening to port number 3003")
})
