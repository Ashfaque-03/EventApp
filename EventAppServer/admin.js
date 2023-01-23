const db = require('./db')
const jwt = require('jsonwebtoken')

const adminCreate = (name, ph, email, dob) => {
    return db.Admin.findOne({ "MobileNo": ph })
        .then(admin => {
            if (admin) {
                return {
                    status: false,
                    statusCode: 403,
                    message: "Already registered ! Please login."
                }
            }
            else {
                const newAdmin = new db.Admin({
                    UniqueId: "EAdmin001",
                    Name: name,
                    MobileNo: ph,
                    Email: email,
                    DateOfBirth: dob,
                    Password: name + "@EAdmin001",
                    RegisteredTime: new Date(),
                    WelcomeBox: "On",
                    About: "Always Happy"
                })
                newAdmin.save()
                return {
                    status: true,
                    statusCode: 203,
                    message: "Registered Successfully"
                }
            }
        })
}
const adminLogin = (userid, pswd) => {
    return db.Admin.findOne({ "UniqueId": userid, "Password": pswd })
        .then(admin => {
            if (admin) {
                admin.LogDetails.unshift({
                    Status: "logged in",
                    Time: new Date()
                })
                var welcome = admin.WelcomeBox
                admin.WelcomeBox = "Off"
                admin.save()
                // token creation
                const token = jwt.sign({
                    currentUserid: userid
                }, 'Eventsuperkeysecret@0367')
                return {
                    status: true,
                    statusCode: 203,
                    message: "Login successfully",
                    userId: admin.UniqueId,
                    welcomebox: welcome,
                    token
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "Wrong User Id or Password"
                }
            }
        })
}

const adminLogout = (userid) => {
    return db.Admin.findOne({ "UniqueId": userid })
        .then(admin => {
            if (admin) {
                admin.LogDetails.unshift({
                    Status: "logged out",
                    Time: new Date()
                })
                admin.save()
                return {
                    status: true,
                    statusCode: 203,
                    message: "Logout successfully",
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "Wrong User Id"
                }
            }
        })
}

const adminLogDetails = (userid) => {
    return db.Admin.findOne({ "UniqueId": userid })
        .then(admin => {
            if (admin) {
                return {
                    status: true,
                    statusCode: 203,
                    message: "login details request approved",
                    LogDetails: admin.LogDetails,
                    RegisteredDetails: admin.RegisteredTime
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "Wrong User Id"
                }
            }
        })
}

const adminDetails = (userid) => {
    return db.Admin.findOne({ "UniqueId": userid })
        .then(admin => {
            if (admin) {
                return {
                    status: true,
                    statusCode: 203,
                    message: "details fetched",
                    userName: admin.Name,
                    userdob: admin.DateOfBirth,
                    userPh: admin.MobileNo,
                    userEmail: admin.Email,
                    about: admin.About,
                    welcomebox: admin.WelcomeBox,
                    pswd: admin.Password
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "details not fetched"
                }
            }
        })
}
// delete account
const deleteAcc = (userid) => {
    return db.Admin.deleteOne({ "UniqueId": userid })
        .then(admin => {
            if (admin.deletedCount != 0) {
                return {
                    status: true,
                    statusCode: 203,
                    message: `Your account(${userid}) is deleted `
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "No account found"
                }
            }
        })
}

// update profile
const changeProfile = (userid, newName, newAbout) => {
    return db.Admin.findOne({ "UniqueId": userid })
        .then(admin => {
            if (admin) {
                admin.Name = newName
                admin.About = newAbout
                admin.save()
                return {
                    status: true,
                    statusCode: 203,
                    message: "Profile Updated",
                    newName: newName,
                    newAbout: newAbout
                }
            }

        })
}
const changePswd = (userid, pswd) => {
    return db.Admin.findOne({ "UniqueId": userid })
        .then(admin => {
            if (admin) {
                admin.Password = pswd
                admin.save()
                return {
                    status: true,
                    statusCode: 203,
                    message: "Password updated.Please login with new password again"
                }
            }

        })
}

const addHistory = (userid) => {
    return db.Event.find({ "Status": "Event added" })
        .then(evt => {
            if (evt) {
                // console.log(evt)
                return {
                    status: true,
                    statusCode: 203,
                    message: "history detected",
                    history: evt
                }

            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "no history"
                }
            }
        })
}
const delHistory = (userid) => {
    return db.Event.find({ "Status": "Event deleted" })
        .then(evt => {
            if (evt) {
                return {
                    status: true,
                    statusCode: 203,
                    message: "history detected",
                    history: evt
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "no history"
                }
            }
        })
}

const confirmHistory = (userid) => {
    return db.Event.find({ "Status": "Event added", "confirm": true })
        .then(evt => {
            if (evt) {
                return {
                    status: true,
                    statusCode: 203,
                    message: "history detected",
                    history: evt
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "no history"
                }
            }
        })
}

const eventConfirm = (UniqueId, Ename, Edate, userid) => {

    return db.Event.findOne({ UniqueId, "EventName": Ename, "Edate": Edate, "Status": "Event added" })
        .then(evt => {
            if (evt) {
                evt.confirm = true
                evt.save()
                return {
                    status: true,
                    statusCode: 203,
                    message: "Event confirmed"
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 403,
                    message: "Event not confirmed ,no data found"
                }
            }
        })
}

const addEvent = (userid, Ename, imgToUrl) => {
    return db.Admin.findOne({ "UniqueId": userid })
        .then(admin => {
            if (admin) {
                return db.Ucode.findOne({ 'initial_id': 1000 })
                    .then(evt => {
                        var signal = 0
                        for (let data of evt.EventNames) {
                            if (data.name == Ename) {
                                signal = 1
                            }
                        }
                        if (signal != 0) {
                            return {
                                status: false,
                                statusCode: 403,
                                message: "Event already exist"
                            }
                        }
                        else {
                            evt.EventNames.push({
                                name: Ename,
                                img: imgToUrl
                            })
                            evt.save()
                            return {
                                status: true,
                                statusCode: 203,
                                message: "Event added"
                            }
                        }

                    })
            }
        })
}

const delEvent = (userid, Ename) => {
    return db.Admin.findOne({ "UniqueId": userid })
        .then(admin => {
            if (admin) {
                return db.Ucode.findOne({ 'initial_id': 1000 })
                    .then(evt => {
                        if (evt) {
                            evt.EventNames = evt.EventNames.filter((event) => event.name != Ename)
                            evt.save()
                            return {
                                status: true,
                                statusCode: 203,
                                message: "Event deleted"
                            }
                        }
                        else {
                            return {
                                status: false,
                                statusCode: 403,
                                message: "Event not deleted"
                            }
                        }

                    })
            }
            else{
                return {
                    status: false,
                    statusCode: 403,
                    message: "not an admin"
                }
            }
        })
}



module.exports = {
    adminCreate, adminLogin, adminLogout, adminDetails, adminLogDetails,
    changePswd, changeProfile, deleteAcc, addHistory, delHistory, eventConfirm,
    confirmHistory, addEvent, delEvent
}