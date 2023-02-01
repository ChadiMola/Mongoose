const express = require("express");
const dbConnection = require("./config/dbConnection");
const User = require("./models/Person");

const createPerson = async () => {
  try {
    const person = new Person({
      name: "John",
      age: 25,
      favoriteFoods: ["pizza", "burgers"],
    });
    await person.save();
    console.log("Person added successfully");
  } catch (error) {
    console.log(error);
  }
};
//createPerson()
const arrayOfPeople = [
  { name: "John", age: 25, favoriteFoods: ["pizza", "burgers"] },
  { name: "Jane", age: 28, favoriteFoods: ["salad", "sushi"] },
  { name: "Jim", age: 30, favoriteFoods: ["steak", "potatoes"] },
];

const createPeople = async () => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log("People created and saved: ", people);
  } catch (error) {
    console.error(error);
  }
};
//createPeople()
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log(people);
  } catch (error) {
    console.error(error);
  }
};
//findPeopleByName()
const findPersonByFavoriteFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log(person);
  } catch (error) {
    console.error(error);
  }
};
const findPersonById = async (id) => {
    try {
      const person = await Person.findById({ id });
      console.log(person);
    } catch (error) {
      console.error(error);
    }
  };
  async function updatePersonById(personId) {
    try {
      const person = await Person.findById(personId);
      person.favoriteFoods.push("hamburger");
      person.markModified("favoriteFoods");
      await person.save();
    } catch (error) {
      console.error(error);
    }
  }
  async function updatePersonByName(personName) {
    try {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
      );
      return updatedPerson;
    } catch (error) {
      console.error(error);
    }
  }
  async function deletePersonById(personId) {
    try {
      await Person.findByIdAndRemove(personId);
    } catch (error) {
      console.error(error);
    }
  }
  async function deletePeopleByName(name) {
    try {
      const result = await Person.remove({ name: name });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  async function findPeopleWhoLikeBurritos() {
    try {
      const people = await Person.find({ favoriteFoods: "burrito" })
        .sort({ name: 1 })
        .limit(2)
        .select("-age")
        .exec();
      return people;
    } catch (error) {
      console.error(error);
    }
  }
  
const app = express();
require("dotenv").config();
console.log(process.env.MONGO_URI);

dbConnection();
const port = 5000;

app.listen(port, (err) =>
  err ? console.log(err) : console.log(`app listening on port ${port}!`)
);
