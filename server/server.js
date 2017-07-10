const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../build/styles')));
app.use(express.static(path.join(__dirname, '../build/scripts')));

app.get('*', (req, res) => {
    console.log('Serving ', req.url);
    res.sendFile(path.join(__dirname, '../build/app.html'));
});

app.listen(port, () => console.log('Listening on port', port));