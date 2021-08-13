const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true}, // unique - 1 user
    password: {type: String, required: true},
    // связка пользователей с типом данных
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)