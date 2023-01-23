const db = require('./db')


const eventDetails = ()=>{
    return db.Ucode.findOne({ 'initial_id': 1000 })    
    .then (ucode=>{
        if(ucode){
            return{
                status:true,
                statusCode:203,
                message:"Events detected",
                eventNames:ucode.EventNames
            }

        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"no Events"
            }   
        }
    })
}

const eventCart =(userid,Ename,Edate)=>{
    return db.Cart.findOne({"UniqueId":userid,"EventName":Ename,"EventDate":Edate})
    .then(evt=>{
        if(evt){
            return{
                status:false,
                statusCode:403,
                message:"Already in cart"
            }
        }
        else{
            const newEvent=new db.Cart({
                Status:"Added to cart",
                UniqueId:userid,
                EventName:Ename,
                EventDate:Edate,
                confirm:false
            })
            newEvent.save()
            return{
                status:true,
                statusCode:203,
                message:"Added to cart"
            }
        }
    })
}
const eventdelCart =(userid,Ename,Edate)=>{
    return db.Cart.deleteOne({"UniqueId":userid,"EventName":Ename,"EventDate":Edate})
    .then(evt=>{
        if(evt){
            return{
                status:true,
                statusCode:203,
                message:"cart deleted"
            }
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"no cart found"
            }
        }
    })
}


const eventCreation =(userid,Ename,Edate)=>{
    return db.Event.findOne({"Status":"Event added","EventName":Ename,"EventDate":Edate})
    .then(evt=>{
        if(evt){
            return{
                status:false,
                statusCode:403,
                message:"No order available at this date"
            }
        }
        else{
            const newEvent=new db.Event({
                Status:"Event added",
                UniqueId:userid,
                EventName:Ename,
                EventDate:Edate,
            })
            newEvent.save()
            return{
                status:true,
                statusCode:203,
                message:"Order booked successfully"
            }
        }
    })
}

const eventDeletion = (userid,Ename,Edate)=>{

    return db.Event.findOne({"UniqueId":userid,"EventName":Ename,"Edate":Edate,"Status":"Event added"})
    .then(evt=>{
        if(evt){
            evt.Status="Event deleted"
            evt.save()
            return{
                status:true,
                statusCode:203,
                message:"Event deleted"
            }
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"Event not deleted ,no data found"
            }
        }
    })
}

module.exports={eventCart,eventdelCart,eventCreation,eventDeletion,eventDetails}