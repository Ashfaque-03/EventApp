const db = require('./db')

const cartHistory = (userid)=>{
    return db.Cart.find({"UniqueId":userid})
    .then (evt=>{
        if(evt){
            // console.log(evt)
            return{
                status:true,
                statusCode:203,
                message:"history detected",
                history:evt
            }

        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"no history"
            }   
        }
    })
}

const addHistory = (userid)=>{
    return db.Event.find({"UniqueId":userid,"Status":"Event added"})
    .then (evt=>{
        if(evt){
            // console.log(evt)
            return{
                status:true,
                statusCode:203,
                message:"history detected",
                history:evt
            }

        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"no history"
            }   
        }
    })
}
const delHistory = (userid)=>{
    return db.Event.find({"UniqueId":userid,"Status":"Event deleted"})
    .then (evt=>{
        if(evt){
            return{
                status:true,
                statusCode:203,
                message:"history detected",
                history:evt
            }
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"no history"
            }
        }
    })
}

module.exports={addHistory,delHistory,cartHistory}