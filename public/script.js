const API_URL = '/api/students';

const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');
const studentIdInput = document.getElementById('studentId');
const nameInput = document.getElementById('name');
const courseInput = document.getElementById('course');
const marksInput = document.getElementById('marks');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');

// Fetch and display all students
async function loadStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();
  tableBody.innerHTML = '';
  students.forEach(s => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.course}</td>
      <td>${s.marks}</td>
      <td>
        <button class="edit-btn" onclick="editStudent(${s.id}, '${s.name}', '${s.course}', ${s.marks})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add or Update student
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = studentIdInput.value;
  const payload = {
    name: nameInput.value,
    course: courseInput.value,
    marks: Number(marksInput.value)
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  resetForm();
  loadStudents();
});

function editStudent(id, name, course, marks) {
  studentIdInput.value = id;
  nameInput.value = name;
  courseInput.value = course;
  marksInput.value = marks;
  submitBtn.textContent = 'Update Student';
  formTitle.textContent = 'Edit Student';
  cancelBtn.style.display = 'inline-block';
}

async function deleteStudent(id) {
  if (!confirm('Delete this student record?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadStudents();
}

cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  form.reset();
  studentIdInput.value = '';
  submitBtn.textContent = 'Add Student';
  formTitle.textContent = 'Add Student';
  cancelBtn.style.display = 'none';
}

loadStudents();
