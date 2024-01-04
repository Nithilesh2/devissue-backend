const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    sevearity: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const issueModal = mongoose.model('issue', issueSchema);
module.exports = issueModal;