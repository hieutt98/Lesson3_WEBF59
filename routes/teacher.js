const express = require('express');
const teacherRoute = express.Router();
const fs = require('fs');
const {verify, counter} = require('../middlewares');

teacherRoute.post('/', counter, (req, res) => {
    if (req.user && req.body.data){
        res.send('success');
    }else
        res.send('Missing data');
});

module.exports = teacherRoute;