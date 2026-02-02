export function getTotalForCategory(expenses, category) {
  return expenses
    .filter(exp => exp.category === category)
    .reduce((sum, exp) => sum + exp.amount, 0);
}

export function capitalize(word) {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1);
}