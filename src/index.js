const {join} = require('path');
const express = require('express');
const docker = require('./docker');
const app = express();
const port = 3000;


// app.use('/favicon.ico', express.static(join(__dirname, `public/favicon.ico`));

let mode = 'docker';
const getFavicon = () => join(__dirname, `public/${mode}.ico`);
app.get('/favicon.ico', (req, res) => {
    res.setHeader('content-type', 'image');
    res.sendFile(getFavicon());
});
app.get('/mode/:mode', (req, res) => {
    const match = /(docker|hacker)/i.exec(req.params.mode);
    mode = match && match[0] || 'docker';
    res.setHeader('content-type', 'image');
    res.sendFile(getFavicon());
});

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
    console.log(`http://localhost:${port}/ps`);
});