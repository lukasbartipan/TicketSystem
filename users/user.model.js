const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profilePic: { type: String },
    role: {type: String, required: true, default: "user"}
});

schema.set('toJSON', { virtuals: false });

module.exports = mongoose.model('users', schema);