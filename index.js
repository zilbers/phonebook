require('dotenv').config();
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

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(morgan('loggerWithBody'));

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get('/api/persons', (req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts);
  });
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((personFromList) => personFromList.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get('/api/info', (req, res) => {
  const info = `PhoneBook has info for ${persons.length} people

${new Date()}`;
  res.send(info);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
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

  res.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
