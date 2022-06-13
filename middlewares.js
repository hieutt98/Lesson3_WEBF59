const e = require('express');
const users = require('./data/users');
const fs = require('fs');

const logger = (req, res, next) => {
    console.log('request at ' + new Date().toString());
    next();
}
const counter = (req, res, next) => {
    verify(req, res, () => {
        const route = req.originalUrl.slice(1, req.originalUrl.length);
        console.log(route)
        if (route === "teacher" || route === "student" || route === "subject") {
            fs.writeFileSync(`././data/${route}s.json`, JSON.stringify({ data: req.body.data }));
            const count = JSON.parse(fs.readFileSync('././data/count.json'));
            let d = false;
            for (c of count.data)
                if (c.user === req.user.username) {
                    c[route] = c[route] ? c[route] + 1 : 1;
                    d = true;
                    break;
                }
            if (!d)
                count.data.push({ user: req.user.username, [route]: 1 });

            fs.writeFileSync('././data/count.json', JSON.stringify(count));
        }
        next();
    })
}

const verify = (req, res, next) => {
    if (!req.body) {
        res.send('Error')
        return;
    }
    const username = req.body.username;
    const apiKey = req.body.apiKey;
    if (apiKey && username) {
        const user = users.find(u =>
            u.apiKey === apiKey && u.username === username
        )
        if (user) {
            console.log(user);
            req.user = user;
            next();
        } else
            res.send('invalid user')
    } else
        res.send('Missing user info');
}
module.exports = { logger, verify, counter };