const mongoose = require('mongoose');

const addListingSchema = new mongoose.Schema({
userToken:{
    type:String,
    required :true
},
picture:{
    type:Array,
    required:false
},
title:{
    type:String,
    required: true
},
category:{
    type:String,
    required:true
},
description:{
    type:String,
    required:false
},
pickUpTime:{
    type:String,
    required:true
},
listFor:{
    type: Number,
    required:true
},
location:{
    type:Object,
    required:true,
  }
},{versionKey:false}, { timestamps: {} });

module.exports = mongoose.model('AddListing', addListingSchema);
