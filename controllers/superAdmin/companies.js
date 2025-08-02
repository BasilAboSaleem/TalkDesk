const { Company, User } = require('./utils');

exports.getPendingCompanies = async (req, res) => {
  try {
    const pendingCompanies = await Company.find({ isActive: false });
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
