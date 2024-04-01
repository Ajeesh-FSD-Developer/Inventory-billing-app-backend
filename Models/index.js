var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();

var DB_NAME = process.env.DB_NAME;
var DB_URL = process.env.DB_URL;
// console.log(DB_URL);

mongoose.connect(`${DB_URL}`, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        // console.error('Error connecting to MongoDB:', err);
    } else {
        // console.log('Connected to MongoDB');
        
    }
});

module.exports = mongoose;
