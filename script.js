const form = document.getElementById("transaction-form");
const typeEl = document.getElementById("type");
const descEl = document.getElementById("desc");
const amountEl = document.getElementById("amount");
const listEl = document.getElementById("transaction-list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateSummary() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  incomeEl.textContent = `Rp ${income}`;
  expenseEl.textContent = `Rp ${expense}`;
  balanceEl.textContent = `Rp ${balance}`;
}

function renderTransactions() {
  listEl.innerHTML = "";
  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.type);
    li.innerHTML = `
      <span>${t.desc} - Rp ${t.amount}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">❌</button>
    `;
    listEl.appendChild(li);
  });
}

function deleteTransaction(index) {
  if (confirm("Hapus transaksi ini?")) {
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
    updateSummary();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = {
    type: typeEl.value,
    desc: descEl.value,
    amount: parseInt(amountEl.value)
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  
  form.reset();
  renderTransactions();
  updateSummary();
});

renderTransactions();
updateSummary();
