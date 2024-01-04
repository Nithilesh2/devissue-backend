const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://21951a05c7:bejugm2@cluster0.64smbdj.mongodb.net/?retryWrites=true&w=majority'

function database() {
    mongoose.connect(`${MONGO_URL}`).then(() => {
        console.log('Successful to DB');
    }).catch(() => {
        console.log('Error');
    })
}

module.exports = database;