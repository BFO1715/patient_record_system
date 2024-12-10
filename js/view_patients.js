import { getPatients } from './app.js';
import { getBMICategory } from './validation.js';

// DOM elements
const tableBody = document.getElementById('patientData');
const searchBar = document.getElementById('searchBar');

// Display patients in the table
function displayPatients(filteredPatients = getPatients()) {
  tableBody.innerHTML = '';

  if (filteredPatients.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No records found</td></tr>';
    return;
  }

  filteredPatients.forEach(patient => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="clickable">${patient.id}</td>
      <td class="clickable">${patient.firstName}</td>
      <td class="clickable">${patient.lastName}</td>
      <td class="clickable">${patient.dob}</td>
    `;

    row.querySelectorAll('.clickable').forEach(cell => {
      cell.addEventListener('click', () => showPatientDetails(patient));
    });

    tableBody.appendChild(row);
  });
}

// Show full details in a popup
function showPatientDetails(patient) {
  const bmi = calculateBMI(patient.weight, patient.height);
  const bmiCategory = getBMICategory(bmi);

  alert(`Patient Details:
    ID: ${patient.id}
    Name: ${patient.firstName} ${patient.lastName}
    DOB: ${patient.dob}
    Height: ${patient.height} cm
    Weight: ${patient.weight} kg
    Sex: ${patient.sex}
    Mobile: ${patient.mobile}
    Email: ${patient.email}
    Health Info: ${patient.healthInfo || 'None'}
    BMI: ${bmi.toFixed(2)}
    BMI Category: ${bmiCategory}
  `);
}

// Calculate BMI
function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Search functionality
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const filteredPatients = getPatients().filter(patient =>
    patient.id.toLowerCase().includes(query) ||
    patient.firstName.toLowerCase().includes(query) ||
    patient.lastName.toLowerCase().includes(query) ||
    patient.dob.includes(query)
  );
  displayPatients(filteredPatients);
});

// Display patients on page load
displayPatients();
