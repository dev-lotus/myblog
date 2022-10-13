const mongoose = require('mongoose');

const FreeBorrowSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true
    },
    lendingInfo: {
        type: String,
        required: true
    },
    listFor: {
        type: Number,
        required: true
    },
    location: {
        type: Object,
        required: true
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

FreeBorrowSchema.set('timestamps', true);

module.exports = mongoose.model('FreeBorrow', FreeBorrowSchema);