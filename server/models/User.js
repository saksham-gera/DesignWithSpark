import mongoose from 'mongoose';

const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    images: [{
        type: Schema.Types.ObjectId,
      ref: 'ImageSchema'
    }]
})

const ImageSchema = new Schema({
    Data: {
      type: String,
      require : true
    } , 
  });

    // validating email and password
userSchema.statics.signup = async function (email, password) {
    // checking for uniqueness of email
    const exists = await this.findOne({ email });
    if (exists)
        throw Error('Email already exists');

    // if email is unique hash the password and create the user
    const salt = await bcrypt.genSalt(10);
    const hashPswd = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hashPswd });
    return user;
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password)
        throw Error('All fields are mandatory');
    const user = await this.findOne({ email });
    if (!user)
        throw Error('Incorrect email');
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        throw Error('Incorrect password');
    return user;
}

const User = mongoose.model('user', userSchema);
const Images = mongoose.model('images',ImageSchema);
export { User, Images };


userSchema.statics.signup = async function (email, password) {

    // validating email and password
    if (!email || !password)
        throw Error('All fields are mandatory');
    if (!validator.isEmail(email))
        throw Error('Entered email is not a valid email');
    if (!validator.isStrongPassword(password))
        throw Error('Password is not strong enough');

    // checking for uniqueness of email
    const exists = await this.findOne({ email });
    if (exists)
        throw Error('Email already exists');

    // if email is unique hash the password and create the user
    const salt = await bcrypt.genSalt(10);
    const hashPswd = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hashPswd });
    return user;
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password)
        throw Error('All fields are mandatory');
    const user = await this.findOne({ email });
    if (!user)
        throw Error('Incorrect email');
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        throw Error('Incorrect password');
    return user;
}

