// main.js
import { setExpenses } from "./state.js";
import { loadExpenses } from "./storage.js";
import { renderUI } from "./render.js";
import * as handlers from "./handlers.js";

/* ---------------- DOM REFERENCES ---------------- */

const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const addExpenseBtn = document.getElementById("add-expense-btn");

const searchInput = document.getElementById("searchInput");
const categoryFilterContainer = document.querySelector(".category-filters");

const expenseItems = document.getElementById("expense-items");

/* ---------------- HYDRATION ---------------- */

setExpenses(loadExpenses());
renderUI();

/* ---------------- ADD EXPENSE ---------------- */

addExpenseBtn.addEventListener("click", () => {
  const name = expenseNameInput.value.trim();
  const amount = Number(expenseAmountInput.value);
  const category = categorySelect.value;

  handlers.addExpense({ name, amount, category });

  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  categorySelect.value = "";
});

/* ---------------- SEARCH ---------------- */

searchInput.addEventListener("input", e => {
  handlers.updateSearch(e.target.value);
});

/* ---------------- CATEGORY FILTER ---------------- */

categoryFilterContainer.addEventListener("click", e => {
  if (!e.target.dataset.category) return;

  document
    .querySelectorAll(".category-filters button")
    .forEach(btn => btn.classList.remove("active"));

  e.target.classList.add("active");

  handlers.changeCategory(e.target.dataset.category);
});

/* ---------------- EXPENSE LIST ACTIONS ---------------- */

expenseItems.addEventListener("click", e => {
  const action = e.target.dataset.action;
  const id = Number(e.target.dataset.id);

  if (action === "delete") {
    handlers.deleteExpense(id);
  }

  if (action === "edit") {
    handlers.startEdit(id);
  }

  if (action === "cancel") {
    handlers.cancelEdit();
  }

  if (action === "save") {
    const updatedName = document.getElementById(
      `edit-name-${id}`
    ).value;

    const updatedAmount = Number(
      document.getElementById(`edit-amount-${id}`).value
    );

    handlers.saveEdit(id, updatedName, updatedAmount);
  }
});
