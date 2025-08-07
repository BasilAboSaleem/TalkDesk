const {logAudit, AuditLog, User, Company, Department, Invitation} = require('./utils');

exports.getNewInvitation = async (req, res) => {
    try {
        res.render('pages/admin/invitation/new');
    } catch (error) {
        console.error('Error fetching new invitation page:', error);
        res.status(500).render('pages/error,500', {
            error: 'Internal Server Error',
            message: 'An error occurred while fetching the new invitation page.'
        });
    }
}