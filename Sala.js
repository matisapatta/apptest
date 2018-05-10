var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salaSchema = new Schema({
  name: String,
  disponible: Boolean
});

var Sala = mongoose.model('Sala', salaSchema);

module.export = Sala;
