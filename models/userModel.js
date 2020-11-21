const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

// userSchema function to compare selected user password
// with a password provided by req.body later
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

//crypt the password before add user
//User.create fire save pre middleware function

userSchema.pre('save', async function (next) {
  //Crypt password only if it new or modified
  //we have to check that
  //if user change email for example there are no
  //need to crypt the password again
  //isModified is mongoose function
  if (!this.isModified('password')) {
    next();
  }
  //create the salt
  const salt = bcrypt.hashSync('admin', 10);
  //create the the password with salt
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
