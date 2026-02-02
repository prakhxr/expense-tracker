import {
  expenses,
  editingId,
  activeCategory,
  searchQuery
} from "./state.js";

import { getTotalForCategory, capitalize } from "./selectors.js";

const expenseItems = document.getElementById("expense-items");
const categoryTotalEl = document.getElementById("categoryTotal");
const TotalAmountEl = document.getElementById("total-amount");

function renderNormalRow(expense) {
    const li = document.createElement("li");

    li.innerHTML = `
            ${expense.name} - ₹${expense.amount}
            <div class="actions">
                <button data-action="edit" data-id="${expense.id}">Edit</button>
                <button data-action="delete" data-id="${expense.id}">Delete</button>
            </div>    
        `;

    expenseItems.appendChild(li);
}

function renderEditRow(expense) {
    const li = document.createElement("li");

    li.innerHTML = `
            <input type="text" value="${expense.name}" id="edit-name-${expense.id}" />
            <input type="number" value="${expense.amount}" id="edit-amount-${expense.id}" />
            <button data-action="save" data-id="${expense.id}">Save</button>
            <button data-action="cancel">Cancel</button>
        `;

    expenseItems.appendChild(li);
}

function renderActiveCategoryTotal(expenses, activeCategory) {
    if (activeCategory === "all") {
        categoryTotalEl.textContent = "";
        return;
    }

    const total = getTotalForCategory(expenses, activeCategory);
    const label = capitalize(activeCategory);

    categoryTotalEl.textContent = `${label} Total: ₹${total}`;
}

function renderTotalAmount() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    TotalAmountEl.textContent = total;
}

export function renderUI() {
    expenseItems.innerHTML = "";

    const visibleExpenses = expenses.filter(exp => {
        const matchesCategory =
            activeCategory === "all" || exp.category === activeCategory;

        const matchesSearch =
            exp.name?.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesSearch;
    });

    if (visibleExpenses.length === 0) {
        expenseItems.innerHTML = "<li>No expenses found</li>";
    }
    
    visibleExpenses.forEach(expense => {
        expense.id === editingId
            ? renderEditRow(expense)
            : renderNormalRow(expense);
    });

    renderTotalAmount();
    renderActiveCategoryTotal(expenses, activeCategory);
}