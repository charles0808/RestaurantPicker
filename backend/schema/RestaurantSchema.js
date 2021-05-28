const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantScehma = new Schema({
    name: {type: Schema.Types.String},
    url: {type: Schema.Types.String},
    tag: [{type: Schema.Types.String}]
})

const restaurantModel = mongoose.model('Restaurant', restaurantScehma, 'restaurant');
module.exports = restaurantModel