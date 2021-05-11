const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, select: false },
    characters : [{ type: Schema.Types.ObjectId, ref: "Character" }]
    },
);


UserSchema.pre('findOne', function (next) {
    this.populate('characters')
    next()
})

UserSchema.pre('find', function (next) {
    this.populate('characters')
    next()
})


const User = mongoose.model("User", UserSchema);
module.exports = User