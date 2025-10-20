const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let students = [];

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Add a new student
app.post('/api/students', (req, res) => {
  const { name } = req.body;
  const student = { name, status: 'unmarked' };
  students.push(student);
  res.json(student);
});

// Update attendance
app.post('/api/attendance', (req, res) => {
  const { name, status } = req.body;
  const student = students.find(s => s.name === name);
  if (student) {
    student.status = status;
    res.json({ message: 'Attendance updated' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
