const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true

    },
    password: {
        type: String,
        equired: true
    },
    email: {
        type: String,
        equired: true,
        unique: true
    }
}, { timestamps: true });
module.exports = mongoose.model("User", UserSchema);