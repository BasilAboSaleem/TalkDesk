const e = require('connect-flash');
const {logAudit, AuditLog, User, Company, Department, Invitation, jwt,
     transporter, cloudinary, fs, validationResult} = require('./utils');


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
           if (invitation.status !== 'pending') {
      req.flash('error', 'This invitation is no longer valid.');
      return res.redirect('/login');
    }
res.render('pages/employee/invitation/accept', { 
  invitation, 
  token, 
  errors: {},       
  formData: {}     
}); 
   } catch (error) {
      console.error('Error fetching new invitation page:', error);
      res.status(500).render('pages/error.500', {
        error: 'Internal Server Error',
        message: 'An error occurred while fetching the new invitation page.'
    });
  }
}


exports.acceptInvitation = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    return res.status(400).render('pages/employee/invitation/accept', {
      errors: errors.mapped(),      
      formData: req.body,
      token: req.body.token
    });
  }
  try {
    const { token, name, password } = req.body;

    const invitation = await Invitation.findOne({ token });
    if (!invitation) {
      return res.status(404).render('pages/error/404', {
        error: 'Not Found',
        message: 'Invitation not found.'
      });
    }

        if (invitation.status !== 'pending') {
      req.flash('error', 'This invitation is no longer valid.');
      return res.redirect('/login');
    }

    let profileImage = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'TakeDesk/profile_images',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
      });
      profileImage = uploadResult.secure_url;

      try {
        await fs.unlink(req.file.path);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
    }

    const user = new User({
      name,
      email: invitation.email,
      password,        
      role: 'employee',
      company: invitation.company,
      department: invitation.department,
      profileImage
    });

    await user.save();

    invitation.status = 'accepted';
    await invitation.save();

    await logAudit({
      userId: user._id,
      companyId: invitation.company,
      action: 'accept_invitation',
      details: {
        email: invitation.email,
        department: invitation.department
      }
    });

    req.flash('success', 'Invitation accepted successfully.');
    res.redirect('/login');

  } catch (error) {
    console.error('Error accepting invitation:', error);
    res.status(500).render('pages/error/500', {
      error: 'Internal Server Error',
      message: 'An error occurred while accepting the invitation.'
    });
  }
};
