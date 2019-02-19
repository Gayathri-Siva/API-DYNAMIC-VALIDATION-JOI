const express = require('express');
const router = express.Router();
const SchemaValidator = require('./middlewares/SchemaValidator');
const Joi = require('joi');


const expressJoi = require('express-joi-validator');
// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true);

// generic route handler
const genericHandler = (req, res, next) => {
    res.json({
        status:'success',
        data: req.body
    });
};
const schema = {
    params: {
        id: Joi.number().min(3).required()
    }
}
const queryschema = {
    query: {
        name: Joi.string().min(6).required()
    }
}

// create a new teacher or student
router.post('/people', validateRequest, genericHandler);

// change auth credentials for teachers
router.post('/auth/edit', validateRequest, genericHandler);

// accept fee payments for students
router.post('/fees/pay', validateRequest, genericHandler);

router.get('/people/:id',expressJoi(schema), function(req, res){
    res.send('validated');
});

router.get('/people',expressJoi(queryschema), function(req, res){
    res.send('validated');
});

module.exports = router;
