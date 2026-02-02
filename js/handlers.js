import {
  expenses,
  editingId,
  setExpenses,
  setEditingId,
  setSearchQuery,
  setActiveCategory
} from "./state.js";

import { saveExpenses } from "./storage.js";
import { renderUI } from "./render.js";

/* ---------------- ADD EXPENSE ---------------- */

export function addExpense({ name, amount, category }) {
  if (name === "" || amount <= 0 || !category) {
    alert("Please enter valid expense details!");
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount,
    category
  };

  const updated = [...expenses, expense];
  setExpenses(updated);

  saveExpenses(updated);
  renderUI();
}

/* ---------------- SEARCH ---------------- */

export function updateSearch(query) {
  setSearchQuery(query.toLowerCase());
  renderUI();
}

/* ---------------- CATEGORY FILTER ---------------- */

export function changeCategory(category) {
  setActiveCategory(category);
  setSearchQuery("");
  renderUI();
}

/* ---------------- DELETE ---------------- */

export function deleteExpense(id) {
  const updated = expenses.filter(exp => exp.id !== id);
  setExpenses(updated);

  if (editingId === id) {
    setEditingId(null);
  }

  saveExpenses(updated);
  renderUI();
}

/* ---------------- EDIT START ---------------- */

export function startEdit(id) {
  setEditingId(id);
  renderUI();
}

/* ---------------- EDIT CANCEL ---------------- */

export function cancelEdit() {
  setEditingId(null);
  renderUI();
}

/* ---------------- EDIT SAVE ---------------- */

export function saveEdit(id, updatedName, updatedAmount) {
  const updated = expenses.map(exp =>
    exp.id === id
      ? { ...exp, name: updatedName, amount: updatedAmount }
      : exp
  );

  setExpenses(updated);
  setEditingId(null);

  saveExpenses(updated);
  renderUI();
}
