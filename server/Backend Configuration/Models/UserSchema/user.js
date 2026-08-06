const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // ---- AUTH FIELDS (owned by Auth module — mat touch karna, teammate 4) ----
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // password kabhi query me by default nahi aayega
    },
    role: {
      type: String,
      enum: ['learner', 'mentor', 'admin'],
      default: 'learner',
    },
    refreshToken: {
      type: String,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // ---- PROFILE FIELDS ----
    // Teammate 4: apne fields yahan neeche add karna (bio, skillsToTeach,
    // skillsToLearn, availability, hourlyRate, etc). Upar wale auth
    // fields ko touch/edit mat karna.
  },
  { timestamps: true }
);

// Password ko save hone se pehle hash karo
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login ke waqt password compare karne ke liye helper method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);