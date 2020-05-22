const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Ticket = db.Ticket;
const User = db.User;

module.exports = {
    getAll,
    getById,
    getByUser,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Ticket.find().select('-hash');
}

async function getById(id) {
    return await Ticket.findById(id).select('-hash');
}

async function create(ticketParam) {
    const ticket = new Ticket(ticketParam);

    // save ticket
    await ticket.save();
}

async function update(id, ticketParam) {
    const ticket = await Ticket.findById(id);

    // validate
    if (!ticket) 
        throw 'Ticket not found';

    // copy ticketParam properties to ticket
    Object.assign(ticket, ticketParam);

    await ticket.save();
}

async function _delete(id) {
    await Ticket.findByIdAndRemove(id);
}

async function getByUser(userId) {

    const user = await User.findById(userId);

    if (!user)
        throw 'User not found!';

    const nameOfUser = user.name + ' ' + user.surname;

    const tickets = await Ticket.find( {$or:[ {raised_by: nameOfUser}, {assigned_to: nameOfUser}]});

    if(tickets.length === 0 || typeof tickets.length === 'undefined' || typeof tickets === null) {
        throw 'This user has no tickets';
    }

    return tickets;
}