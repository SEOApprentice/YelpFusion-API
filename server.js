const express = require('express');
const cors = require('cors');
const yelp = require('yelp-fusion');
const app = express();

const apiKey = 'mAnnjvlPD3824Obc2R0A5ghDVb-AjH__VNAzKpNp4jAut1rYSfjUOcK5ycwOu6B8y2JOWYxzjqhlIH90hGDi2jBychZIwQGtZ-19gB4pUSrFCkNE7K3wbsWs78dWZ3Yx';
const client = yelp.client(apiKey);

app.use(cors());
app.use(express.json());

// Search businesses
app.get('/search', (req, res) => {
    const { term, location } = req.query;
    client.search({ term, location })
        .then(response => res.json(response.jsonBody))
        .catch(err => res.status(500).send(err));
});

// Business details
app.get('/business/:id', (req, res) => {
    client.business(req.params.id)
        .then(response => res.json(response.jsonBody))
        .catch(err => res.status(500).send(err));
});

// Reviews
app.get('/business/:id/reviews', (req, res) => {
    client.reviews(req.params.id)
        .then(response => res.json(response.jsonBody))
        .catch(err => res.status(500).send(err));
});

// Autocomplete
app.get('/autocomplete', (req, res) => {
    const { text } = req.query;
    client.autocomplete({ text })
        .then(response => res.json(response.jsonBody))
        .catch(err => res.status(500).send(err));
});

// Business match
app.get('/match', (req, res) => {
    const { name, address1, city, state, country } = req.query;
    client.businessMatch('lookup', { name, address1, city, state, country })
        .then(response => res.json(response.jsonBody))
        .catch(err => res.status(500).send(err));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));







console.log('Happy developing ✨')

