const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    date: {type: Date, required: true},
    content: {type: String, required: true},
});

module.exports = mongoose.model('Comment', commentSchema);
