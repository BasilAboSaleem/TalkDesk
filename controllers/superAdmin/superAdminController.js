const {getAllCompanies ,viewCompany ,softDeleteCompany ,getPendingCompanies, 
        viewPendingCompany ,approveCompany, rejectCompany, getDeletedCompanies
     } = require('./companies');

module.exports = {
    getAllCompanies,
    viewCompany,
    softDeleteCompany,
    getPendingCompanies,
    viewPendingCompany,
    approveCompany,
    rejectCompany,
    getDeletedCompanies
}
