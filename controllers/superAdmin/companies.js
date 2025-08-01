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

