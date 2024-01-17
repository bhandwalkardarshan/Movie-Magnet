const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String},
    avatar:{type:String},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User