import { getPatients } from './app.js';

// DOM elements
const tableBody = document.getElementById('patientData');
const searchBar = document.getElementById('searchBar');

// Fetch patients and display them
function displayPatients(filteredPatients = getPatients()) {
  tableBody.innerHTML = ''; // Clear existing table rows

  // Check if there are any patients
  if (filteredPatients.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No records found</td></tr>';
    return;
  }

  // Create table rows for each patient
  filteredPatients.forEach(patient => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="clickable">${patient.id}</td>
      <td class="clickable">${patient.firstName}</td>
      <td class="clickable">${patient.lastName}</td>
      <td class="clickable">${patient.dob}</td>
    `;

    // Add click event to show full details
    row.querySelectorAll('.clickable').forEach(cell => {
      cell.addEventListener('click', () => showPatientDetails(patient));
    });

    tableBody.appendChild(row);
  });
}

// Display full patient details in a popup
function showPatientDetails(patient) {
  const patientDetails = `
    <strong>Patient ID:</strong> ${patient.id}<br>
    <strong>First Name:</strong> ${patient.firstName}<br>
    <strong>Last Name:</strong> ${patient.lastName}<br>
    <strong>Date of Birth:</strong> ${patient.dob}<br>
    <strong>Height:</strong> ${patient.height} cm<br>
    <strong>Weight:</strong> ${patient.weight} kg<br>
    <strong>Sex:</strong> ${patient.sex}<br>
    <strong>Mobile:</strong> ${patient.mobile}<br>
    <strong>Email:</strong> ${patient.email}<br>
    <strong>Health Information:</strong> ${patient.healthInfo || 'None'}<br>
  `;

  alert(`Patient Details:\n\n${patientDetails.replace(/<br>/g, '\n')}`); // Simple alert for full details
}

// Search functionality
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filteredPatients = getPatients().filter(patient =>
    patient.id.toLowerCase().includes(query) ||
    patient.firstName.toLowerCase().includes(query) ||
    patient.lastName.toLowerCase().includes(query) ||
    patient.dob.toLowerCase().includes(query)
  );
  displayPatients(filteredPatients);
});

// Display all patients on page load
displayPatients();
