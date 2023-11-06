const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://harshitbhardwaj97:${password}@cluster0.ilmdnrx.mongodb.net/phoneBookTest?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log(`Connected with DB !`);
      Person.find({}).then((persons) => {
        console.log("phonebook:");
        persons.forEach((person) => {
          console.log(person.name, person.phoneNumber);
        });
        mongoose.connection.close();
      });
    })
    .catch((error) => console.error(error));
} else if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log(`Connected with DB !`);
      const personName = process.argv[3];
      const personPhoneNumber = process.argv[4];

      const person = new Person({
        name: personName,
        phoneNumber: personPhoneNumber,
      });

      person.save().then(() => {
        console.log(
          `added ${personName} number ${personPhoneNumber} to phonebook`
        );
        mongoose.connection.close();
      });
    })
    .catch((error) => console.error(error));
}
