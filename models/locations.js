
//========= location schema ================//
const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
	name: {type: String, require: true, unique: true},
	image:{type: String, require: true},
	description: {type: String, require: true},
    likes: {type: String, default: 0}
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location