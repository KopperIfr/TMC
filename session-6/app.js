import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import User from "./User.js";
import Person from "./Person.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB!');
    } catch (error) {
        console.log(error);
    }
}

const run = async () => {



    //=====================   COUNTING   ========================

    // Counting number of Users in DB
    await User.countDocuments();

    // Counting number of Users in DB filtering by age
    await User.countDocuments({age: 22});



    //=====================   CREATING   ========================

    // Creating a new user and adding to DB
    await User.create({username: 'Kopper', password: 'SomePassword'});

    // Creating many users and adding to DB
    await User.insertMany([
        {name: 'John', age: 2},
        {name: 'Daisy', age: 98}
    ])




    //=====================   RETRIEVING   ========================

    // Retrieving a user that matches the conditions
    await User.find({name: 'John', age: 12, street: 'Some street'});
    await User.findOne({name: 'John'});

    // Retrieving one user but just the name field
    await User.findOne({name: 'John'}, 'name');

    // Retrieving all users
    await User.find();

    // Retrieving all users but just the name and age fields
    await User.find({}, 'name age');

    // Retrieving user by its id
    await User.findById(id);

    // Retrieving user by its id but just name and age fields
    await User.findById(id, 'name age');



    //=====================   DELETING   ========================
    
    // Find user by id and delete
    await User.findByIdAndDelete(id);

    // Find user and delete
    await User.findOneAndDelete({name: 'John'});

    // Deleting all users that match conditions
    await User.deleteMany({name: 'John', age: 12});

    // Deleting one user that matches conditions
    await User.deleteOne({name: 'John', age: 12});







    //=====================   UPDATING   ========================
    // Find user by id and update
    await User.findByIdAndUpdate(id);

    // Find user and update
    await User.findOneAndUpdate({name: 'John', age: 12});

    // Find users and update
    await User.updateMany({name: 'John'});

}

//run();

connectDB();




const run2 = async () => {

    // Get users where name equals John
    await User.where('name').equals('John');

    // Get users where age is greater than 12
    await User.where('age').gt(12);

    // Get users where age is greater or equals 38
    await User.where('age').gte(38);

    // Get users where age is lower than 12
    await User.where('age').lt(12);

    // Get users where age is lower or equal to 12
    await User.where('age').lte(12);
    

    // Get users where age is greater than 12 and users name is John
    await User.where('age').gt(12).where('name').equals('John');

    // Get users where name equals John with a limit of 2
    await User.where('name').equals('John').limit(2);

    // Get users name and age where name equals John with a limit of 2
    await User.where('name').equals('John').limit(2).select('name age');

    // Populating a linked model object within our current model with
    // its actual data.
    await User.where('name').equals('John').populate('bestFriend');


    // Get users sorted by age in desc mode
    await User.find().sort({name: 'ascending', age: 'descending'});


    const person = await Person.findByName('John');
    console.log(person.namedEmail);
    // Output: Name, John and email, john@gmail.com
}

