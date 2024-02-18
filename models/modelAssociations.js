import BUDGET from './budget/budgetModel.js';
import EXPENSE_CATEGORY from './budget/expenseCategoryModel.js';
import EXPENSE from './budget/expenseModel.js';
import INCOME from './budget/incomeModel.js';
import SCRAP_SELL from './budget/scrapSellingModel.js';
import TRANSACTIONS from './budget/transactions.js';
import ADVANCE from './employee/advanceModel.js';
import ATTENDANCE from './employee/attendanceModel.js';
import DEDUCTION from './employee/deductionModel.js';
import EMPLOYEE from './employee/employeeModel.js';
import PAYMENT_RECEIPT from './employee/paymentReceiptModel.js';
import CLIENT from './work/clientModel.js';
import DELIVERY_CHALLAN from './work/deliveryChallanModel.js';
import INVOICE from './work/invoiceModel.js';
import JOB from './work/jobModel.js';
import MATERIAL from './work/materialModel.js';
import USER from './work/userModel.js';

function setupAssociations() {
    // work
    USER.hasMany(JOB)
    USER.hasMany(CLIENT)
    USER.hasMany(MATERIAL)
    USER.hasMany(INVOICE)
    USER.hasMany(DELIVERY_CHALLAN)
    MATERIAL.hasMany(JOB);
    JOB.belongsTo(MATERIAL);
    CLIENT.hasMany(JOB);
    JOB.belongsTo(CLIENT);
    CLIENT.hasMany(INVOICE);
    INVOICE.belongsTo(CLIENT);
    INVOICE.hasMany(JOB);
    DELIVERY_CHALLAN.hasMany(JOB)
    JOB.belongsTo(DELIVERY_CHALLAN)
    JOB.belongsTo(INVOICE);
    JOB.belongsTo(USER)
    INVOICE.belongsTo(USER)
    MATERIAL.belongsTo(USER)
    CLIENT.belongsTo(USER)
    DELIVERY_CHALLAN.belongsTo(USER)
    // employee
    USER.hasMany(ATTENDANCE)
    USER.hasMany(ADVANCE)
    USER.hasMany(DEDUCTION)
    USER.hasMany(EMPLOYEE)
    USER.hasMany(PAYMENT_RECEIPT)
    ATTENDANCE.belongsTo(USER)
    ADVANCE.belongsTo(USER)
    DEDUCTION.belongsTo(USER)
    EMPLOYEE.belongsTo(USER)
    PAYMENT_RECEIPT.belongsTo(USER)
    EMPLOYEE.hasMany(ADVANCE)
    ADVANCE.belongsTo(EMPLOYEE)
    EMPLOYEE.hasMany(ATTENDANCE)
    ATTENDANCE.belongsTo(EMPLOYEE)
    EMPLOYEE.hasMany(PAYMENT_RECEIPT)
    PAYMENT_RECEIPT.belongsTo(EMPLOYEE)
    PAYMENT_RECEIPT.hasMany(DEDUCTION)
    DEDUCTION.belongsTo(PAYMENT_RECEIPT)
    // budget 
    USER.hasMany(BUDGET)
    BUDGET.belongsTo(USER)
    USER.hasMany(EXPENSE_CATEGORY)
    EXPENSE_CATEGORY.belongsTo(USER)
    USER.hasMany(EXPENSE)
    EXPENSE.belongsTo(USER)
    USER.hasMany(INCOME)
    INCOME.belongsTo(USER)
    USER.hasMany(TRANSACTIONS)
    TRANSACTIONS.belongsTo(USER)
    EXPENSE_CATEGORY.hasMany(BUDGET)
    EXPENSE_CATEGORY.hasMany(EXPENSE)
    BUDGET.belongsTo(EXPENSE_CATEGORY)
    EXPENSE.belongsTo(EXPENSE_CATEGORY)
    INCOME.hasOne(TRANSACTIONS)
    TRANSACTIONS.belongsTo(INCOME)
    EXPENSE.hasOne(TRANSACTIONS)
    TRANSACTIONS.belongsTo(EXPENSE)
    INVOICE.hasOne(INCOME)
    INCOME.belongsTo(INVOICE)

    // scrap sell associations
    USER.hasMany(SCRAP_SELL)
    INCOME.belongsTo(SCRAP_SELL)
    // INCOME.hasMany(SCRAP_SELL)
    SCRAP_SELL.hasOne(INCOME)
    SCRAP_SELL.belongsTo(USER)
    // SCRAP_SELL.belongsTo(INCOME)
}

export default setupAssociations;