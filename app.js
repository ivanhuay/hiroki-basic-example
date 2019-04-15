const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');
const bodyParser = require('body-parser');
const hiroki = require('hiroki');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost:27017/test')
  .then(()=>{
    console.log('connection succes!');
  })

Object.keys(models).forEach((model)=>{
  hiroki.rest(model);
})
app.use(hiroki.build());


app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(error, req, res, next) {
    console.error('handleError: ', error);
    return res.status(error.status || 500).json({
        status: error.status,
        error: error.message,
        stack: error.stack
    });
});


app.listen(3030);
console.log('server listening on port 3030...');
