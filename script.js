document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const incomeForm = document.getElementById("income-form");
    const expenseList = document.getElementById("expense-list");
    const totalIncomeEl = document.getElementById("total-income");
    const totalExpenseEl = document.getElementById("total-expense");
    const totalSavingsEl = document.getElementById("total-savings");
    const filterCategory = document.getElementById("filter-category");

    let expenses = [];
    let incomes = [];

    // Handle Income Form
    incomeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const source = document.getElementById("income-source").value;
        const amount = parseFloat(document.getElementById("income-amount").value);
        const date = document.getElementById("income-date").value;

        const income = {
            id: Date.now(),
            source,
            amount,
            date
        };

        incomes.push(income);
        updateTotals();
        incomeForm.reset();
    });

    // Handle Expense Form
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        expenses.push(expense);
        displayExpenses(expenses);
        updateTotals();
        expenseForm.reset();
    });

    // Handle Expense Actions (Edit/Delete)
    expenseList.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);

        if (e.target.classList.contains("delete-btn")) {
            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotals();
        }

        if (e.target.classList.contains("edit-btn")) {
            const expense = expenses.find(expense => expense.id === id);

            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;

            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotals();
        }
    });

    // Filter by Category
    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        if (category === "All") {
            displayExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense => expense.category === category);
            displayExpenses(filtered);
        }
    });

    function displayExpenses(list) {
        expenseList.innerHTML = "";
        list.forEach(expense => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>₹${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
        });
    }

    function updateTotals() {
        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const savings = totalIncome - totalExpense;

        totalIncomeEl.textContent = totalIncome.toFixed(2);
        totalExpenseEl.textContent = totalExpense.toFixed(2);
        totalSavingsEl.textContent = savings.toFixed(2);
    }
});
