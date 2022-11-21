const mongoose = require('mongoose');

const addListingSchema = new mongoose.Schema({
    userToken: {
        type: String,
        required: true
    },
    picture: {
        type: Array,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    pickUpTime: {
        type: String,
        required: true
    },
    listFor: {
        type: Number,
        required: true
    },
    location: {
        type: Object,
        required: true,
    },
    likes: {
        type: Array,
        required: false
    },
    onHold: {
        type: Boolean,
        required: false,
        default: false
    },
    disable: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    versionKey: false
});

addListingSchema.set('timestamps', true);
addListingSchema.index({ "location": '2dsphere' });
module.exports = mongoose.model('AddListing', addListingSchema);