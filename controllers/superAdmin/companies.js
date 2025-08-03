const e = require('express');
const { Company, User, Message, Attachment, AuditLog,
   Conversation, Department, mongoose } = require('./utils');


exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ isDeleted: { $ne: true } });
    res.render('pages/superadmin/companies/all-companies', {
      title: 'All Companies',
      companies
    });
  } catch (error) {
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while fetching all companies.'
    });
  }
};

exports.viewCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findById(companyId);
    const admin = await User.findOne({ company: companyId, role: 'admin' }).select('name email');
    if (!company) {
      return res.status(404).render('pages/error/404', {
        title: 'Company Not Found',
        message: 'The requested company does not exist.'
      });
    }
    res.render('pages/superadmin/companies/view', {
      title: 'View Company',
      company,
      admin
    });
  } catch (error) {
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while fetching the company details.'
    });
  }
};
exports.softDeleteCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).render('pages/error/404', {
        title: 'Company Not Found',
        message: 'The requested company does not exist.'
      });
    }

    company.isActive = false;
    company.isRejected = false; 
    company.isDeleted = true; // soft-deleted
    await company.save();

    req.flash('success', 'Company soft-deleted successfully.');
    res.redirect('/sadmin/companies');
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while soft-deleting the company.'
    });
  }
};

exports.getPendingCompanies = async (req, res) => {
  try {
    const pendingCompanies = await Company.find({ isActive: false, isRejected: false, isDeleted: false });
    res.render('pages/superAdmin/companies/pending-approval', {
      title: 'Pending Companies',
      companies: pendingCompanies
    });
  } catch (error) {
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while fetching pending companies.'
    });
  }
}

exports.viewPendingCompany = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await Company.findById(companyId);
    const admin = await User.findOne({ company: companyId, role: 'admin' }).select('name email');
    if (!company || company.isActive) {
      return res.status(404).render('pages/error/404', {
        title: 'Company Not Found',
        message: 'The requested company does not exist or is already active.'
      });
    }
    res.render('pages/superAdmin/companies/view', {
      title: 'View Pending Company',
      company,
      admin
    });
  } catch (error) {
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while fetching the company details.'
    });
  }
};

exports.approveCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).render('pages/error/404', {
        title: 'Company Not Found',
        message: 'The requested company does not exist.'
      });
    }

    if (company.isActive) {
      return res.status(400).render('pages/error/400', {
        title: 'Already Approved',
        message: 'This company has already been approved.'
      });
    }

    company.isActive = true;
    company.isRejected = false;
    company.rejectionReason = undefined;

    await company.save();

    req.flash('success', 'Company approved successfully.');
    res.redirect('/sadmin/companies/pending');
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while approving the company.'
    });
  }
};

exports.rejectCompany = async (req, res) => {
  const { companyId } = req.params;
  const { reason } = req.body;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).render('pages/error/404', {
        title: 'Company Not Found',
        message: 'The requested company does not exist.'
      });
    }

    if (company.isActive) {
      return res.status(400).render('pages/error/400', {
        title: 'Already Approved',
        message: 'This company has already been approved.'
      });
    }

    company.isRejected = true;
    company.rejectionReason = reason;
    company.isActive = false;

    await company.save();

    req.flash('success', 'Company rejected successfully.');
    res.redirect('/sadmin/companies/pending');
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while rejecting the company.'
    });
  }
};

exports.getDeletedCompanies = async (req, res) => {
  try {
    const deletedCompanies = await Company.find({ isDeleted: true });
    res.render('pages/superadmin/companies/all-companies', {
      title: 'Deleted Companies',
      companies: deletedCompanies
    });
  } catch (error) {
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while fetching deleted companies.'
    });
  }
};

exports.restoreCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).render('pages/error/404', {
        title: 'Company Not Found',
        message: 'The requested company does not exist.'
      });
    }

    company.isDeleted = false;
    company.isActive = true; 
    company.isRejected = false; 

    await company.save();

    req.flash('success', 'Company restored successfully.');
    res.redirect('/sadmin/companies-deleted');
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while restoring the company.'
    });
  }
};

exports.permanentDeleteCompany = async (req, res) => {
  const { companyId } = req.params;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const company = await Company.findById(companyId).session(session);

    if (!company) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).render('pages/error/404', {
        title: 'Company Not Found',
        message: 'The requested company does not exist.'
      });
    }

    // get all users for company
    const users = await User.find({ company: companyId }).session(session);
    const userIds = users.map(u => u._id);

    // get all conversations for users
    const conversations = await Conversation.find({ participants: { $in: userIds } }).session(session);
    const conversationIds = conversations.map(c => c._id);

    // delete messages associated with conversations
    await Message.deleteMany({ conversation: { $in: conversationIds } }).session(session);

    // delete conversations
    await Conversation.deleteMany({ _id: { $in: conversationIds } }).session(session);

    // delete users
    await User.deleteMany({ company: companyId }).session(session);

    // delete attachments associated with company
    await Attachment.deleteMany({ company: companyId }).session(session);

    // delete audit logs associated with company
    await AuditLog.deleteMany({ company: companyId }).session(session);

    // delete departments associated with company
    await Department.deleteMany({ company: companyId }).session(session);

    // delete company 
    await Company.findByIdAndDelete(companyId).session(session);

    // complete the transaction
    await session.commitTransaction();
    session.endSession();

    req.flash('success', 'Company permanently deleted successfully.');
    res.redirect('/sadmin/companies-deleted');

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).render('pages/error/500', {
      title: 'Internal Server Error',
      message: 'Something went wrong while permanently deleting the company.'
    });
  }
};