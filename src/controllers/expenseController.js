import * as expenseApi from "../models/api/expenseApi";
import Expense from "../models/entities/Expense";

export async function getAllExpenses() {
  const docs = await expenseApi.getAllExpenses();
  return docs.map((d) => new Expense(d));
}

export async function getExpenseById(id) {
  const data = await expenseApi.getExpenseById(id);
  return data ? new Expense(data) : null;
}

export async function addExpense(expenseData) {
  const expense = new Expense(expenseData);
  return await expenseApi.createExpense(expense);
}

export async function updateExpense(id, updates) {
  return await expenseApi.updateExpense(id, updates);
}

export async function deleteExpense(id) {
  return await expenseApi.deleteExpense(id);
}
