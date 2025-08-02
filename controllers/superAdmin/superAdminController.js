const {getAllCompanies ,viewCompany ,softDeleteCompany ,getPendingCompanies, viewPendingCompany ,approveCompany, rejectCompany } = require('./companies');

module.exports = {
    getAllCompanies,
    viewCompany,
    softDeleteCompany,
    getPendingCompanies,
    viewPendingCompany,
    approveCompany,
    rejectCompany
}
