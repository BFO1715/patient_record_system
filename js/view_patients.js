// Fetch patients from local storage
function getPatients() {
  return JSON.parse(localStorage.getItem('patients')) || [];
}

// Format Date of Birth to DD-MM-YYYY
function formatDOB(dob) {
  const date = new Date(dob);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Format Patient ID to PAT-1234 (4-digit random ID)
function formatPatientID(id) {
  // Ensure ID is already in short format, if not, generate a new one
  const match = id.match(/^PAT-\d{4}$/);
  if (match) {
    return id; // ID is already in the correct format
  }
  return `PAT-${Math.floor(1000 + Math.random() * 9000)}`; // Generate a new ID
}

// Display patients in the table
function displayPatients(filteredPatients = getPatients()) {
  const tableBody = document.getElementById('patientData');
  const patients = getPatients(); // Original patients list from storage

  tableBody.innerHTML = '';

  if (filteredPatients.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No records found</td></tr>';
    return;
  }

  // Ensure all patient IDs are properly formatted and update the local storage
  filteredPatients.forEach((patient) => {
    if (!/^PAT-\d{4}$/.test(patient.id)) {
      patient.id = formatPatientID(patient.id); // Reformat Patient ID
    }
  });

  // Save the updated patient list back to local storage
  localStorage.setItem('patients', JSON.stringify(patients));

  // Populate the table
  filteredPatients.forEach((patient) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${patient.id}</td>
      <td>${patient.firstName}</td>
      <td>${patient.lastName}</td>
      <td>${formatDOB(patient.dob)}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const patients = getPatients();

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.id.toLowerCase().includes(query) ||
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      formatDOB(patient.dob).includes(query)
    );
  });

  displayPatients(filteredPatients);
});

// Initialize the display of patients on page load
document.addEventListener('DOMContentLoaded', () => displayPatients());



