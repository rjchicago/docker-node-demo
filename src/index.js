const express = require('express');
const docker = require('./docker');
const app = express();
const port = 3000;

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