const {logAudit, AuditLog, User, Company, Department, Invitation, jwt, transporter} = require('./utils');

exports.getNewInvitation = async (req, res) => {
  try {
    const companyId = req.user.company;
    const departments = await Department.find({ company: companyId });
    res.render('pages/admin/invitation/new', { departments });
  } catch (error) {
    console.error('Error fetching new invitation page:', error);
    res.status(500).render('pages/error.500', {
      error: 'Internal Server Error',
      message: 'An error occurred while fetching the new invitation page.'
    });
  }
};


exports.createInvitation = async (req, res) => {
  try {
    const { email, department } = req.body;
    const companyId = req.user.company;
    const userId = req.user._id;

    // Check if user already exists
    const existingUser = await User.findOne({
  email: email.toLowerCase(),
  company: companyId
});

if (existingUser) {
  return res.status(400).json({
    errors: { email: req.t('user.emailExistsError') }
  });
}

    // البحث عن ايميل موجود بحالة pending أو accepted
    const existing = await Invitation.findOne({ 
      email: email.toLowerCase(), 
      company: companyId, 
      status: { $in: ['pending', 'accepted'] }
    });

    if (existing) {
      return res.status(400).json({
        errors: { email: req.t('invitation.emailExistsError') }
      });
    }


    const token = jwt.sign({ email, company: companyId }, process.env.JWTSECRET_KEY, { expiresIn: '2d' });

    const newInvitation = new Invitation({
      email: email.toLowerCase(),
      department,
      company: companyId,
      invitedBy: userId,
      token,
      expiresAt: Date.now() + 2 * 24 * 60 * 60 * 1000 
    });

    await newInvitation.save();

    await logAudit({
      userId,
      companyId,
      action: 'create_invitation',
      details: {
        email,
        department,
        invitationId: newInvitation._id
      } 
       
    });

    const invitationLink = `${process.env.BASE_URL}/invitation/accept?token=${token}`;
   await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Invitation to Join Our Platform',
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <div style="background-color: #4CAF50; color: white; padding: 15px; font-size: 20px; text-align: center;">
        ${req.t('invitation.emailHeader') || 'You Are Invited!'}
      </div>
      <div style="padding: 20px; font-size: 16px; color: #333;">
        <p>${req.t('invitation.emailBody')}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${invitationLink}" 
            style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
            ${req.t('invitation.acceptButton') || 'Accept Invitation'}
          </a>
        </div>
        <p style="font-size: 14px; color: #777;">If the button above doesn’t work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #4CAF50;">${invitationLink}</p>
      </div>
      <div style="background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} TalkDesk. All rights reserved.
      </div>
    </div>
  </div>
  `
});


   

  return res.json({
  success: true,
  message: req.t('flashMessages.success.invitationSent'),
  redirect: '/admin/invitations'
});
  } catch (error) {
    console.error('Error creating invitation:', error);
    res.status(500).render('pages/error/500', {
      message: 'An error occurred while creating the invitation.'
    });
  }
};

 