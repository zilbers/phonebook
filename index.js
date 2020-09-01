require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Contact = require('./models/contact');

morgan.token('loggerWithBody', function (tokens, req, res) {
  let body;
  tokens.method(req, res) === 'POST'
    ? (body = `| body - Name: ${req.body.name}, Number: ${req.body.number} |`)
    : (body = '');
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    body,
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(morgan('loggerWithBody'));

app.get('/api/persons', (req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts);
  });
});

app.get('/api/persons/:id', (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get('/api/info', (req, res) => {
  Contact.find({}).then((contacts) => {
    const info = `PhoneBook has info for ${
      contacts.length
    } people\n${new Date()}`;
    res.send(info);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then((contacts) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Can't update PhoneBook with this data",
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });
  contact.save(contact).then((contacts) => res.json(contacts));
});

app.put('/api/persons/:id', (req, res) => {
  const body = req.body;

  const contact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then((updatedContact) => {
      res.json(updatedContact);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
