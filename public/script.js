const form = document.getElementById('add-student-form');
const tableBody = document.querySelector('#attendance-table tbody');

async function loadStudents() {
  const res = await fetch('/api/students');
  const data = await res.json();
  tableBody.innerHTML = '';
  data.forEach(student => addRow(student));
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('student-name').value;
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  const student = await res.json();
  addRow(student);
  form.reset();
});

function addRow(student) {
  const row = document.createElement('tr');
  row.classList.add(student.status);
  row.innerHTML = `
    <td>${student.name}</td>
    <td>
      <button onclick="markAttendance('${student.name}', 'present')">Present</button>
      <button onclick="markAttendance('${student.name}', 'absent')">Absent</button>
    </td>
  `;
  tableBody.appendChild(row);
}

async function markAttendance(name, status) {
  await fetch('/api/attendance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, status })
  });
  loadStudents();
}

loadStudents();
