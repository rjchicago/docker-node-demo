const express = require('express');
const {join} = require('path');
const docker = require('./docker');
const app = express();
const port = 3000;

app.use('/favicon.ico', express.static(join(__dirname, `public/favicon.ico`)));

app.get('/*', (req, res) => {
    const { method, path, query, headers } = req;
    try {
        const data = docker.get(method, decodeURI(path), query, headers);
        const contentType = typeof data === 'string'
            ? 'text/plain'
            : 'application/json'
        res.setHeader('content-type', contentType);
        res.send(data);
    } catch(error) {
        res.status = 500;
        res.send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/ps`);
});