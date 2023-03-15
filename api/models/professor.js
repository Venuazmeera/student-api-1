

const mongoose = require('mongoose');

const professor_userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, 
    required: true, 
    unique: true,
    match: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
    },
    password: { type: String, required: true} 
});


module.exports = mongoose.model('Professor_user', professor_userSchema);