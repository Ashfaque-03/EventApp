const db =require('./db')
const jwt = require('jsonwebtoken')


const loginService = (userid , pswd)=>{
    return db.User.findOne({"UniqueId":userid , "Password":pswd})
    .then (user=>{
        if(user){
            user.LogDetails.unshift({
                Status:"logged in",
                Time: new Date()
            })
            var welcome=user.WelcomeBox
            user.WelcomeBox="Off"
            console.log(user.WelcomeBox)
            user.save()
            // token creation
            const token = jwt.sign({
                currentUserid: userid
            }, 'Eventsuperkeysecret@0367')
            return{
                status:true,
                statusCode:203,
                message:"Login successfully",
                userId:user.UniqueId,
                welcomebox:welcome,
                token
            }
        }
        else{
            return db.User.findOne({"MobileNo":userid , "Password":pswd})
            .then (user=>{
                if(user){
                    user.LogDetails.unshift({
                        Status:"logged in",
                        Time: new Date()
                    })
                    var welcome=user.WelcomeBox
                    user.WelcomeBox="Off"
                    console.log(user.WelcomeBox)
                    user.save()
                    // token creation
                    const token = jwt.sign({
                        currentUserid: userid
                    }, 'Eventsuperkeysecret@0367')
                    return{
                        status:true,
                        statusCode:203,
                        message:"Login successfully",
                        userId:user.UniqueId,
                        welcomebox:welcome,
                        token          
                    }
                }
                else{
                    return{
                        status:false,
                        statusCode:403,
                        message:"Wrong User Id or Password"
                    }
                }
            }) 
        }
    }) 
}
        
const logoutService =(userid)=>{
    return db.User.findOne({"UniqueId":userid})
    .then (user=>{
        if(user){
            user.LogDetails.unshift({
                Status:"logged out",
                Time: new Date()
            })
            user.save()
            return{
                status:true,
                statusCode:203,
                message:"Logout successfully",                
            }
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"Wrong User Id"
            }
        }
    })
}

const LogDetails = (userid)=>{
    return db.User.findOne({"UniqueId":userid})
    .then (user=>{
        if(user){
            return{
                status:true,
                statusCode:203,
                message:"login details request approved",     
                LogDetails:user.LogDetails ,          
                RegisteredDetails:user.RegisteredTime
            }
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"Wrong User Id"
            }
        }
    })}

const userDetails= (userid)=>{
    return db.User.findOne({"UniqueId":userid})
    .then (user=>{
        if(user){
            return{
                status:true,
                statusCode:203,
                message:"details fetched",
                userName:user.Name,
                userdob:user.DateOfBirth,
                userPh:user.MobileNo,
                userEmail:user.Email,  
                about:user.About,
                welcomebox:user.WelcomeBox,
                pswd:user.Password
            }
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"details fetched"
            }
        }
    })}

    
module.exports = {loginService,logoutService,LogDetails,userDetails}
