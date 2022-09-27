const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    profilePicture:{
        type:String,
        required:false,
        default:"http://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png"
    },
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    emailAddress:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:false,
        default:0
    },
    aboutYou:{
        type: String,
        required:false,
        default:""
    },
    likes:{
        type:Array,
        required:false,
        default:[]
    },
    dislikes:{
        type:Array,
        required:false,
        default:[]
    },
    myLocation:{
        type:Object,
        required:false,
        default:{"lng":0, "lat":0}
    }
}, { versionKey: false })

module.exports = mongoose.model('Users', userSchema);