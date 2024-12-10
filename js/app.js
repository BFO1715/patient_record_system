import { validatePatient, calculateAge, getBMICategory } from './validation.js';

// Form and message elements
const form = document.getElementById('addPatientForm');
const message = document.getElementById('message');

// Handle patient form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Collect patient data from the form
  const patient = {
    id: `PAT-${Date.now()}`, // Unique patient ID (corrected syntax with backticks)
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

  // Validate patient inputs
  const error = validatePatient(patient);
  if (error) {
    message.textContent = error; // Display validation error
    message.style.color = 'red';
    return;
  }

  // Retrieve existing patients from localStorage or initialize an empty array
  const patients = JSON.parse(localStorage.getItem('patients')) || [];

  // Add the new patient to the array
  patients.push(patient);

  // Save the updated patient array to localStorage
  localStorage.setItem('patients', JSON.stringify(patients));

  // Notify the user and reset the form
  message.textContent = 'Patient added successfully!';
  message.style.color = 'green';
  form.reset();
});

// Utility functions for patient display (for integration into other pages)
export function getPatients() {
  return JSON.parse(localStorage.getItem('patients')) || [];
}

export function deletePatient(id) {
  const patients = getPatients();
  const updatedPatients = patients.filter(patient => patient.id !== id);
  localStorage.setItem('patients', JSON.stringify(updatedPatients));
  return updatedPatients;
}
