import { validatePatient } from './validation.js';

const form = document.getElementById('addPatientForm');

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

  const error = validatePatient(patient);
  if (error) {
    alert(error);
    return;
  }

  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  patients.push(patient);
  localStorage.setItem('patients', JSON.stringify(patients));

  alert('Patient added successfully and saved to local storage!');
  form.reset();
});
