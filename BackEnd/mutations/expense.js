const Expense = require("../dbSchema/Expense");

const createExpense = async (args) => {
    let newExpense = new Expense({
        user: args.user,
        group: args.group,
        amount: args.amount,
        description: args.description,
        expense_date: args.expense_date,
    });
    let success = await newExpense.save();
    if (success) {
        return { status: 200, message: 'EXPENSE_CREATE_SUCCESS' };
    }
    else {
        return { status: 500, message: 'EXPENSE_CREATE_ERROR' };
    }
};

exports.createExpense = createExpense;
