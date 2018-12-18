const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const carSchema = ({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Car', carSchema);