const db = require('./db')
const registerService = (name, ph, email, dob, pswd) => {

    //otherwise data won't save in database
    return db.User.findOne({ "Email": email })
        .then(user => {
            if (user) {
                return {
                    status: false,
                    statusCode: 403,
                    message: "Already registered ! Please login."
                }
            }
            else {
                return db.User.findOne({ "MobileNo": ph })
                    .then(user => {
                        if (user) {
                            return {
                                status: false,
                                statusCode: 403,
                                message: "Already registered ! Please login."
                            }
                        }
                        else {
                            return db.Ucode.findOne({ 'initial_id': 1000 })
                                .then(ucode => {
                                    if (ucode) {
                                        const newUser = new db.User({
                                            UniqueId: ucode.next_id,
                                            Name: name,
                                            MobileNo: ph,
                                            Email: email,
                                            DateOfBirth: dob,
                                            Password: pswd,
                                            RegisteredTime: new Date(),
                                            WelcomeBox:"On",
                                            About:"Always Happy"
                                        })
                                        newUser.save()  //otherwise data won't save in database
                                        id = ucode.next_id
                                        ucode.next_id += 1
                                        ucode.save()
                                        return {
                                            status: true,
                                            statusCode: 203,
                                            message: "Registered Successfully. Your userId:",
                                            currentId: id,
                                            nextId: ucode.next_id
                                        }
                                    }
                                    else {
                                        newUcode = new db.Ucode({
                                            initial_id: 1000,
                                            next_id: 1001,
                                            EventNames:["Wedding","Engagement","Reception","Birthday","Death Ceremony","Photography",
                                            "Catering","Conferencing","Inauguration","College Fest","Job Fair","Festivals","Sports"]
                                        })
                                        newUcode.save()
                                        const newUser = new db.User({
                                            UniqueId: 1000,
                                            Name: name,
                                            MobileNo: ph,
                                            Email: email,
                                            DateOfBirth: dob,
                                            Password: pswd,
                                            RegisteredTime: new Date(),
                                            WelcomeBox:"On",
                                            About:"Always Happy"
                                        })
                                        newUser.save()  //otherwise data won't save in database
                                        return {
                                            status: true,
                                            statusCode: 203,
                                            message: "Registered Successfully. Your userId:",
                                            currentId: 1000,
                                            nextId: 1001
                                        }
                                    }
                                })

                        }

                    })
            }

        })
}

// delete account
const deleteAcc = (userid)=>{
    return db.User.deleteOne({"UniqueId":userid})
    .then(user=>{
        if(user){
            return{
                status:true,
                statusCode:203,
                message:`Your account(${userid}) is deleted `
            }
        }
        else{
            return{
                status:false,
                statusCode:403,
                message:"No account found"
            }
        }
    })
}

// update profile
const changeProfile = (userid,newName,newAbout)=>{
    return db.User.findOne({"UniqueId":userid})
    .then(user=>{
        if(user){
            user.Name=newName
            user.About=newAbout
            user.save()
            return{
                status:true,
                statusCode:203,
                message:"Profile Updated",
                newName:newName,
                newAbout:newAbout
            }
        }
        
    })
}
const changePswd = (userid,pswd)=>{
    return db.User.findOne({"UniqueId":userid})
    .then(user=>{
        if(user){
            user.Password=pswd
            user.save()
            return{
                status:true,
                statusCode:203,
                message:"Password updated.Please login with new password again"
            }
        }
        
    })
}



module.exports = { registerService , deleteAcc, changeProfile,changePswd}