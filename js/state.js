export let expenses = [];
export let editingId = null;
export let searchQuery = "";
export let activeCategory = "all";

export function setExpenses(val) {
    expenses = val;
}

export function setEditingId(val) {
    editingId = val;
}

export function setSearchQuery(val) {
    searchQuery = val;
}

export function setActiveCategory(val) {
    activeCategory = val;
}