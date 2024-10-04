const Expense = require('../models/Expense');

// Create a new expense
exports.addExpense = async (req, res) => {
  const { amount, category, description } = req.body;
  try {
    const expense = new Expense({ user: req.user, amount, category, description });
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Get all expenses for logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });
    res.json(expenses);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user) {
      return res.status(404).json({ msg: 'Expense not found' });
    }
    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user) {
      return res.status(404).json({ msg: 'Expense not found' });
    }
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Expense removed' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
