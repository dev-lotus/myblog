const mongoose = require('mongoose');

const addRequestScheme = new mongoose.Schema({
    listId: {
        type:String,
        required:true
    },
    listType: {
        type:String,
        required:true,
    },
    listedUserToken:{
        type:String,
        required:true
    },
    requesterUserToken:{
        type:String,
        required:true
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