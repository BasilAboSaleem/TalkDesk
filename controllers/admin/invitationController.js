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
      html: `<p>${req.t('invitation.emailBody')}</p><p><a href="${invitationLink}">${req.t('invitation.acceptButton')}</a></p>`
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

 