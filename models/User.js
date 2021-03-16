const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

const UserSchema = new Schema(
    {
        username: String,
        password: String,
    }
)

UserSchema.methods.comparePassword = function (password) {
    if (!this.password) { return false }
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.password = hashPassword(this.password);
    }
    next();
})

const User = mongoose.model("User", UserSchema);

module.exports = User;