const {registerCompany_get , registerCompany_post} = require('./registerCompanyController');
const {login_get, login_post, logout_get} = require('./loginController');


module.exports = {
    registerCompany_get,
    registerCompany_post,
    login_get,
    login_post,
    logout_get
    
}
