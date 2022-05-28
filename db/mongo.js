const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

const mongodbURL = process.env.MONGODB_URL;
function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(`${mongodbURL}`,
        {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useUnifiedTopology: true
        }).then((res, err) => {
            if(err) return reject(err);
            console.log('success connect to database.');
            resolve();
        });
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };