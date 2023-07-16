const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    img: {type: String},
    contant: {type: String, required: true},
    date: {type: Date , required: true},
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment"}],
    likes: [{ type: mongoose.Types.ObjectId, ref: "Like"}]
});

module.exports = mongoose.model('Post', postSchema);
