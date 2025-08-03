const Company = require('../../models/Company');
const User = require('../../models/User');
const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');
const Department = require('../../models/Department');
const AuditLog = require('../../models/AuditLog');
const Attachment = require('../../models/Attachment');
const mongoose = require('mongoose');


module.exports = {
    Company,
    User,
    Message,
    Conversation,
    Department,
    AuditLog,
    Attachment,
    mongoose

}
