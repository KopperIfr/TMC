import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
    name: String,
    email: String,
    updatedAt: Date
})

PersonSchema.methods.sayHi = function() {
    console.log(`Hello my name is: ${this.name}`);
}

PersonSchema.statics.findByName = function(name) {
    return this.where('name').equals(name);
}

PersonSchema.statics.findArthuro = function() {
    return this.where('name').equals('Arthuro');
}


PersonSchema.pre('save', function(next) {
    
});

PersonSchema.pre('save', function(next){
    console.log('This middleware is called before data is saved');
    this.updatedAt = Date.now();
    next();
});

PersonSchema.pre('validate', function(next){
    console.log('This middleware is called before data is validated');
    next();
});

PersonSchema.post('updateOne', function(doc, next) {
    console.log('This middleware is called after data is updated');
    console.log(`Updated data: ${doc}`);
    next();
});

const Person = mongoose.model('Person', PersonSchema);

export default Person;