const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://OmriZIl:${password}@zilbers0.jgrxn.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Contact = mongoose.model('Contact', contactSchema);

const contact = new Contact({
  name: 'Sir Mongo',
  number: 0545055053,
});

// contact.save().then((result) => {
//   console.log('Contact saved!');
//   mongoose.connection.close();
// });

Contact.find({}).then((result) => {
  result.forEach((contact) => {
    console.log(contact);
  });
  mongoose.connection.close();
});
