const Company = require('../../models/Company');
const User = require('../../models/User');

exports.registerCompany_get = (req, res) => {
  res.render('pages/auth/registerCompany', {
    title: 'Register Company'
  });
}