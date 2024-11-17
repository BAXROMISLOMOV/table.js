const employeeTable = document.querySelector('#employeeTable tbody');
const addNewBtn = document.getElementById('addNewBtn');
const modal = document.getElementById('employeeModal');
const saveBtn = document.getElementById('saveBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

let employees = JSON.parse(localStorage.getItem('employees')) || [];
let editingIndex = null;

function renderTable() {
  employeeTable.innerHTML = '';
  employees.forEach((employee, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.phone}</td>
      <td class="actions">
        <button onclick="editEmployee(${index})">✏️</button>
        <button onclick="deleteEmployee(${index})">🗑️</button>
      </td>
    `;
    employeeTable.appendChild(row);
  });
}

function addEmployee(employee) {
  employees.push(employee);
  localStorage.setItem('employees', JSON.stringify(employees));
  renderTable();
}

function editEmployee(index) {
  editingIndex = index;
  const employee = employees[index];
  document.getElementById('name').value = employee.name;
  document.getElementById('email').value = employee.email;
  document.getElementById('phone').value = employee.phone;
  modal.style.display = 'flex';
}

function updateEmployee(index, updatedEmployee) {
  employees[index] = updatedEmployee;
  localStorage.setItem('employees', JSON.stringify(employees));
  renderTable();
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem('employees', JSON.stringify(employees));
  renderTable();
}

addNewBtn.addEventListener('click', () => {
  editingIndex = null;
  modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

saveBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (!name || !email || !phone) {
    alert('All fields are required!');
    return;
  }

  const employee = { name, email, phone };

  if (editingIndex !== null) {
    updateEmployee(editingIndex, employee);
  } else {
    addEmployee(employee);
  }

  modal.style.display = 'none';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
});

renderTable();
