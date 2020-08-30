const express = require("express");
const app = express();

app.use(express.json());

const persons = [
  {
    name: "Arto Hellas",
    number: "050-1123423",
    id: "1",
  },
  {
    name: "Mor Food",
    number: "054-1144423",
    id: "2",
  },
  {
    name: "Aym An",
    number: "052-1222123",
    id: "3",
  },
  {
    name: "Pea Nutbutter",
    number: "058-1177763",
    id: "4",
  },
  {
    name: "Coco Loca",
    number: "050-1126763",
    id: "5",
  },
];

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
