const express = require('express');
const morgan = require('morgan');
const app = express();

morgan.token('mine', function (tokens, req, res) {
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
app.use(morgan('mine'));

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

let persons = [
  {
    name: 'Arto Hellas',
    number: '050-1123423',
    id: 1,
  },
  {
    name: 'Mor Food',
    number: '054-1144423',
    id: 2,
  },
  {
    name: 'Aym An',
    number: '052-1222123',
    id: 3,
  },
  {
    name: 'Pea Nutbutter',
    number: '058-1177763',
    id: 4,
  },
  {
    name: 'Coco Loca',
    number: '050-1126763',
    id: 5,
  },
];

app.get('/api/persons', (req, res) => {
  res.send(persons);
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
  if (
    !body.name ||
    !body.number ||
    persons.some((person) => person.name === body.name)
  ) {
    return res.status(400).json({
      error: "Can't update PhoneBook with this data",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
