const {logAudit, AuditLog, User, Company, Department, Invitation, jwt,
     transporter, cloudinary} = require('./utils');


exports.showAcceptForm = async (req, res) => {
    try {
      const { token } = req.query;
      const invitation = await Invitation.findOne({ token });

      if (!invitation) {
        return res.status(404).render('pages/error.404', {
          error: 'Not Found',
          message: 'Invitation not found.'
        });
      }
      res.render('pages/employee/invitation/accept', { invitation , token });
    } catch (error) {
      console.error('Error fetching new invitation page:', error);
      res.status(500).render('pages/error.500', {
        error: 'Internal Server Error',
        message: 'An error occurred while fetching the new invitation page.'
    });
  }
}