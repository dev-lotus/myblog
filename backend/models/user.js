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
        type:Number,
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
    mylocation:{
        type:Object,
        required:false,
        default:{"lat":0, "long":0}
    }
}, { versionKey: false })

module.exports = mongoose.model('Users', userSchema);