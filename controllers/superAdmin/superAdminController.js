const {getAllCompanies ,viewCompany ,softDeleteCompany ,getPendingCompanies, 
        viewPendingCompany ,approveCompany, rejectCompany, getDeletedCompanies
         , restoreCompany, permanentDeleteCompany
     } = require('./companies');

module.exports = {
    getAllCompanies,
    viewCompany,
    softDeleteCompany,
    getPendingCompanies,
    viewPendingCompany,
    approveCompany,
    rejectCompany,
    getDeletedCompanies,
    restoreCompany,
    permanentDeleteCompany
}
