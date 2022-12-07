const db =require('./db.js')

const messageCreation = (userid,msg) =>{
    return db.User.findOne({"UniqueId":userid})
    .then(user=>{
        if(user){
            return db.Message.findOne({"UniqueId":userid})
            .then(msguser=>{
                if(msguser){
                    point=msguser.Chatpoint
                    return db.Message.deleteOne({"UniqueId":userid})
                    .then(data=>{
                        if(data){
                            const newMessage =new db.Message({
                                UniqueId:userid,
                                Name:user.Name,
                                Message:msg,
                                Chatpoint:point+1
                            })
                            newMessage.save()
                            return{
                                status:true,
                                statusCode:203,
                                message:"message added"
                            }
                        }
                    })                 
                }
                else{
                    const newMessage =new db.Message({
                        UniqueId:userid,
                        Name:user.Name,
                        Message:msg,
                        Chatpoint:1
                    })
                    newMessage.save()
                    return{
                        status:true,
                        statusCode:203,
                        message:"message added"
                    }
                }
            })
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"no user registered"
            }
        }
    })
}

const messageHistory =(userid) =>{
    return db.User.findOne({"UniqueId":userid})
    .then(user=>{
        if(user){
            return db.Message.find()
            .then(data=>{
                if(data){
                    return{
                        status:true,
                        statusCode:203,
                        message:"messages fetched",
                        messagedetails:data
                    }
                }
                else{
                    return{
                        status:false,
                        statusCode:403,
                        message:"messages not fetched",
                    }
                }
            })
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"no user registered"
            }
        }
    })
}

module.exports={messageCreation,messageHistory}