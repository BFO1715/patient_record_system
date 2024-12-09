import { validatePatient, calculateAge, getBMICategory } from './validation.js';

const form = document.getElementById('addPatientForm');
const message = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const patient = {
    id: `PAT-${Date.now()}`,
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    dob: document.getElementById('dob').value,
    height: parseInt(document.getElementById('height').value),
    weight: parseInt(document.getElementById('weight').value),
    sex: document.getElementById('sex').value,
    mobile: document.getElementById('mobile').value.trim(),
    email: document.getElementById('email').value.trim(),
    healthInfo: document.getElementById('healthInfo').value.trim(),
  };

  // Validate inputs
  const error = validatePatient(patient);
  if (error) {
    message.textContent = error;
    message.style.color = 'red';
    return;
  }

  // Save patient
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  patients.push(patient);
  localStorage.setItem('patients', JSON.stringify(patients));

  message.textContent = 'Patient added successfully!';
  message.style.color = 'green';
  form.reset();
});