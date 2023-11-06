const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGO_URI;

// console.log("connecting to", url);

mongoose
  .connect(url)

  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const numberValidators = [
  {
    // Minimum length validator
    validator: (number) => {
      if ((number[2] === "-" || number[3] === "-") && number.length < 9) {
        return false;
      }
      return true;
    },
    msg: "Phone Number must be at least 8 digits",
  },
  {
    // Regex validator to allow only numbers
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number);
    },
    msg: "Invalid phone number",
  },
];

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  phoneNumber: {
    type: String,
    validate: numberValidators,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
