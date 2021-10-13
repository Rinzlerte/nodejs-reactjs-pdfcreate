const express = require('express');
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const cors = require('cors');
const pdfTemplate = require('./documents');

const app = express();
const port = process.env.Port || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// POST - PDF GENERATION with fetching data

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

//GET - SEND GENERATED PDF TO THE CLIENT

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

app.listen(port, () => console.log(`Listening on port ${port}`));