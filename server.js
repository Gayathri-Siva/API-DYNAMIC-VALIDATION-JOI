const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
var app = express();

app.use(bodyParser.json());

const schema = {
    query: {
        name: Joi.string().required()
    },
    body: {
        age: Joi.number().min(2).required(),
        company: Joi.object({
            name: Joi.string().required(),
            role: Joi.string().required().valid('HR', 'Technical') //enum style validation
        }).required()
    },
    params: {
        id: Joi.number().required()
    }
}

app.post('/testapi/:id', expressJoi(schema), function(req, res){
    res.send('validated');
});

//error handler
app.use(function (err, req, res, next) {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
});

app.listen('5000',  ()=>{
    console.log(`listening to 5000`);
});