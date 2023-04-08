const mongoose  = require('mongoose');
const validator = require('validator');

const credentialSchema = new mongoose.Schema({
    RKNEC_email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please enter email in correct format'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
})

module.exports = mongoose.model('Credential', credentialSchema);