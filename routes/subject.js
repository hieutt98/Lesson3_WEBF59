const express = require('express');
const subjectRoute = express.Router();
const fs = require('fs');
const {verify, counter} = require('../middlewares');

subjectRoute.post('/', counter, (req, res) => {
    if (req.user && req.body.data){
        res.send('success');
    }else
        res.send('Missing data');
});

module.exports = subjectRoute;