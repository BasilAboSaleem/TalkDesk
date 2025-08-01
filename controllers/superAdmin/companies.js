const { Company } = require('./utils');

exports.pendingCompanies_get = async (req, res) => {
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