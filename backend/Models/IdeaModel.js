const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    technologies: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },linkedin: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Idea = mongoose.model("Idea", IdeaSchema);
module.exports = Idea;
