const mongoose = require('mongoose')

const drinkSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: 'User' // Which MODEL this objectID in type refers to
    },
    name: {
        type: String,
        required: [true, 'Please add text value']
    },
    instructions: {
        type: String,
        required: [true, 'Please add text value']
    },
    measurements: {
        type: String,
        required: [true, 'Please add text value']
    },
    ingredients: {
        type: String,
        required: [true, 'Please add text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', drinkSchema)