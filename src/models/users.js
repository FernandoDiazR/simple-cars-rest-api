const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true},
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }]
});

module.exports = mongoose.model('User', userSchema);