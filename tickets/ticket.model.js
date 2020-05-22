const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    subject: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    raised_by: { type: String, required: true },
    assigned_to: { type: String, default: ''},
    status: { type: String,  default: 'Accepted'},
    priority: { type: Number, default: 1},
    date_updated: { type: Date, default: Date.now}
});

schema.set('toJSON', { virtuals: false });

module.exports = mongoose.model('tickets', schema);