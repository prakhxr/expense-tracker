# Expense Tracker (Vanilla JavaScript)

A state-driven Expense Tracker built with **Vanilla JavaScript**, focused on clean architecture, predictable rendering, and strong frontend fundamentals without using frameworks.

## 🚀 Features
- Add, edit, and delete expenses  
- Categorize and filter expenses  
- Search expenses by name (case-insensitive)  
- Inline editing  
- Category-wise total (shown only when a category is active)  
- Overall expense total  
- Persistent storage using `localStorage`  
- Graceful handling of empty states  

## 🧠 Architecture Highlights
- **Single Source of Truth**: All data lives in JavaScript state  
- **DOM as a Projection**: UI is fully re-rendered from state on every update  
- **Derived UI**: Filters, search results, and totals are computed from state  
- **Unidirectional Data Flow**: User events → state update → render  
- **Separation of Concerns**: State, rendering, events, and persistence are isolated  

## 🧱 State Management
```js
let expenses = [];
let editingId = null;
let activeCategory = "all";
let searchQuery = "";
```

## 🔄 Rendering Strategy
```js
const visibleExpenses = expenses.filter(exp => {
  const matchesCategory =
    activeCategory === "all" || exp.category === activeCategory;

  const matchesSearch =
    exp.name?.toLowerCase().includes(searchQuery);

  return matchesCategory && matchesSearch;
});
```

## 💾 Persistence
- Uses browser `localStorage`  
- State hydrated on page load  

## 🧪 Edge Cases Handled
- Editing under active filters or search  
- Deleting an expense being edited  
- Empty search results  
- Missing categories  

## 🎯 Why No Framework?
Built without frameworks to strengthen JavaScript fundamentals and create an architecture that can easily scale to React.

## 🛠️ Tech Stack
HTML, CSS, Vanilla JavaScript (ES6+), `localStorage`

## 👤 Author
**Prakhar** — Frontend / JavaScript Developer
