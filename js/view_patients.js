import { calculateAge, getBMICategory } from './validation.js';

const patients = JSON.parse(localStorage.getItem('patients')) || [];
const tableBody = document.getElementById('patientData');
const searchBar = document.getElementById('searchBar');

// Populate table with patient data
function displayPatients(filteredPatients = patients) {
  tableBody.innerHTML = ''; // Clear existing table rows

  // Check if there are any patients
  if (filteredPatients.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6">No records found</td></tr>';
    return;
  }

  // Create table rows for each patient
  filteredPatients.forEach(patient => {
    const row = document.createElement('tr');
    const age = calculateAge(patient.dob);
    const bmi = calculateBMI(patient.weight, patient.height);
    const bmiCategory = getBMICategory(bmi);

    row.innerHTML = `
      <td>${patient.id}</td>
      <td>${patient.firstName} ${patient.lastName}</td>
      <td>${age}</td>
      <td>${bmi.toFixed(2)}</td>
      <td>${bmiCategory}</td>
      <td>
        <button onclick="deletePatient('${patient.id}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Search functionality
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filteredPatients = patients.filter(patient =>
    patient.firstName.toLowerCase().includes(query) ||
    patient.lastName.toLowerCase().includes(query) ||
    patient.id.toLowerCase().includes(query)
  );
  displayPatients(filteredPatients);
});

// Delete a patient
window.deletePatient = (id) => {
  if (confirm('Are you sure you want to delete this patient?')) {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    displayPatients(updatedPatients);
  }
};

// Calculate BMI
function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Display patients on load
displayPatients();