const mongoose = require('mongoose');

const addRequestScheme = new mongoose.Schema({
    listId: {
        type:String,
        require:true
    },
    listedUserToken:{
        type:String,
        require:true
    },
    requesterUserToken:{
        type:String,
        require:true
    },
    request_message:{
        type:String,
        required:true
    },
    acceptance_status:{
        type:String,
        required:true
    },
    rejection_message:{
        type:String,
        required:false
    }
},{
    versionKey:false
});

addRequestScheme.set('timestamps', true);

module.exports = mongoose.model('Request', addRequestScheme);