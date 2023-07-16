const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true},
    profilePic: { type: String},
    bio: {type: String},
    followers: [{ type: String}],
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post"}]
});

module.exports = mongoose.model('User', userSchema);
