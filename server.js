/*
Dependencias
 */
const express = require('express')
const app = express()
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/salas-ensayo');

/*
Clases
 */
//const Sala = require('./Sala');
var Schema = mongoose.Schema;
var salaSchema = new Schema({
  name: String,
  disponible: Boolean
});

var Sala = mongoose.model('Sala', salaSchema);


app.get('/', function(req, res) {
  res.send('Hello World!!')
});

// Pido estado de una sala
app.get('/sala/:name', function(req, res) {
  Sala.findOne({name: req.params.name}).then(function(response) {
    if (!response) return res.send('No la encontré');
    res.send(JSON.stringify(response));
  });
});

// Creo una sala
app.post('/sala/:name', function (req, res) {
  const sala = new Sala({ name: req.params.name });
  sala.save().then(function () {
    res.send('sala creada ' +  req.params.name);
  });
});

app.post('/sala/:name/ocupar', function (req, res) {
  Sala.findOne({name: req.params.name}).then(function(sala) {
    if (!sala) return res.send('No la encontré');
    
    sala.disponible = false;
    sala.save().then(function() {
      res.send("Sala " +  sala.name + " ocupada.");
    });
  });
});


app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
