const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    data: {type: Data, default: Data.now},
    clicks: {type: Number, default: 0},
    // связка link c пользователем, который их создал
    links: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Link', schema)