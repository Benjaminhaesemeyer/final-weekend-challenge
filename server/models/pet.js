var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema({
  petID: { type: String, required: true, index: { unique: true } },
  petName: {type: String},
  imageURL: {type: String},
  description: {type: String}
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
